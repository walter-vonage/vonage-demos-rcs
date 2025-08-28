const axios = require('axios');
const RcsUtils = require('./rcs_utils');
const Config = require('../config')
const DB = require('./db');
const QRCode = require('qrcode');

function action(app) {

    // Root
    app.get('/', async (req, res) => {
        res.render('index', { config: Config });
    })

    // Send RCS message to any number
    app.get('/send/:phone', async (req, res) => {
        const phone = req.params.phone;
        if (phone) {
            RcsUtils.sendRCSText(phone, 'Welcome to Vonage Demos!', null, () => {
                res.status(200).json({ success: true });
            })
        } else {
            res.status(200).json({ success: false, message: 'No phone provided' });
        }
    })

    // QR generator endpoint from index.ejs
    app.get('/qr', async (req, res) => {
        try {
            const nameRaw = (req.query.name || '').toString().trim();
            const phoneRaw = (req.query.phone || '').toString().trim();
            
            const name = nameRaw || 'Guest';
            const sender = Config.data.SENDER_ID; // e.g. "447700900000"
            const body = `Hello ${name}`;

            // Store/overwrite name for this phone (if provided)
            await DB.upsertContact(phoneRaw, name);

            const target = `sms:${sender}@rbm.goog?body=${encodeURIComponent(body)}`;

            res.set('Content-Type', 'image/png');
            await QRCode.toFileStream(res, target, { margin: 1, width: 512 });
        } catch (err) {
            console.error('QR generation failed:', err);
            res.status(500).send('QR generation failed');
        }
    });

    app.get('/changewh', async (req, res) => {
        const appId = "1e38efc1-cc18-4c9e-81a4-b119e7162a8c";
        const jwtToken = generateJWT();
    
        try {
            const response = await axios.put(
                `https://api.nexmo.com/v2/applications/${appId}`,
                {
                    name: "Dreamforce",
                    capabilities: {
                        messages: {
                            webhooks: {
                                inbound_url: {
                                    address: "https://yourdomain.com/inbound",
                                    http_method: "POST"
                                },
                                status_url: {
                                    address: "https://yourdomain.com/status",
                                    http_method: "POST"
                                }
                            }
                        }
                    }
                },
                {
                    headers: {
                        "Authorization": `Bearer ${jwtToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );
    
            console.log("✅ Webhooks updated:", response.data);
            res.status(200).json({success:true})
        } catch (error) {
            console.error("❌ Error updating webhooks:", error.response?.data || error.message);
            res.status(200).json({success:false})
        }
    })

    // Validate if phone is RCS valid
    //  POST /capability-check
    //  body: [ '447375637444', '...', '...' ]
    app.post('/capability-check', async (req, res) => {
        try {
            const body = req.body;
            if (!Array.isArray(body) || body.length === 0) {
                return res.status(400).json({ success: false, message: 'Nothing to check' });
            }
            const original = body.map(String);
            const normalized = [...new Set(original.map(normalizeMsisdn).filter(Boolean))];
          
            const CONCURRENCY = 8;
            const results = await mapWithConcurrency(normalized, CONCURRENCY, async (msisdn) => {
                const r = await RcsUtils.checkNumber(msisdn);
                return {
                    phone: msisdn,
                    ok: r.ok,
                    status: r.status,
                    data: r.data,
                    error: r.error
                };
            });

            return res.status(200).json({
                success: true,
                totalRequested: original.length,
                uniqueChecked: normalized.length,
                results
            });
        }  catch (err) {
            console.error('capability-check error:', err);
            return res.status(200).json({ 
                success: false, 
                message: 'Internal error' 
            });
        }
    })
    
}

function generateJWT() {
    if (Config.data.DEV) {
        return Config.data.JWT;
    } else {
        return tokenGenerate(applicationId, privateKey, {
            exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60, // 8 hours
        })
    }
}

function normalizeMsisdn(input) {
    if (input == null) return null;
    const digits = String(input).replace(/\D/g, '');
    // very light sanity check; adjust to your policy (E.164 without '+')
    if (digits.length < 8) return null;
    // accept both 00-prefix and plain national/international—keep digits only
    return digits.startsWith('00') ? digits.slice(2) : digits;
}

async function mapWithConcurrency(items, limit, fn) {
    const out = new Array(items.length);
    let i = 0;
    const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
        while (true) {
            const idx = i++;
            if (idx >= items.length) break;
            try {
                out[idx] = await fn(items[idx]);
            } catch (e) {
                out[idx] = { ok: false, status: 0, error: { message: String(e) } };
            }
        }
    });
    await Promise.all(workers);
    return out;
}

module.exports = {
    action
}