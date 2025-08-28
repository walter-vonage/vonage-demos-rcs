const axios = require('axios');
const Config = require('../config')
const { tokenGenerate } = require('@vonage/jwt')
const privateKey = process.env.VCR_PRIVATE_KEY;
const applicationId = process.env.VCR_API_APPLICATION_ID;

//  THIS IS FOR FUNCTION "checkNumber"
// Simple in-memory cache (msisdn -> { data, expiresAt })
const CACHE_TTL_MS = 60_000; // 1 minute
const cache = new Map();
function getFromCache(key) {
    const hit = cache.get(key);
    if (hit && hit.expiresAt > Date.now()) return hit.data;
    cache.delete(key);
    return null;
}
function putInCache(key, data) {
    cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL_MS });
}
function backoff(iter) {
    const ms = Math.min(2000, 250 * Math.pow(2, iter - 1)); // 250, 500, 1000, cap 2s
    return new Promise(r => setTimeout(r, ms));
}
function shapeAxiosError(resp) {
    let detail = undefined;
    try {
        detail = typeof resp.data === 'object' ? resp.data : String(resp.data);
    } catch (_) {
        detail = undefined;
    }
    return {
        message: 'Request failed',
        detail
    };
}
const http = axios.create({
    baseURL: 'https://api.nexmo.com',
    timeout: 10_000, // 10s
    validateStatus: () => true // we handle status codes manually
});

function sendRCSText(to, message, webhook_url, callback) {
    const from = Config.data.FROM;
    if (!from || !to) {
        console.log('sendRCSText - Returning false')
        callback({
            success: false,
            message: 'Invalid data'
        })
        return false;
    }
    let data = JSON.stringify({
        "message_type": "text",
        "text": message,
        "to": to,
        "from": from,
        "channel": "rcs"
    });
    if (webhook_url) {
        data = JSON.stringify({
            "message_type": "text",
            "text": message,
            "to": to,
            "from": from,
            "channel": "rcs",
            "webhook_url": webhook_url
        });
    }
    sendRCS(data, callback);
}

function sendRCSVideo(to, videoUrl, webhook_url, callback) {
    const from = Config.data.FROM;
    if (!from || !to) {
        console.log('sendRCSVideo - Returning false')
        callback({
            success: false,
            message: 'Invalid data'
        })
        return false;
    }
    let data = JSON.stringify({
        "message_type": "video",
        "video": {
            "url": videoUrl
        },
        "to": to,
        "from": from,
        "channel": "rcs"
    });
    if (webhook_url) {
        data = JSON.stringify({
            "message_type": "video",
            "video": {
                "url": videoUrl
            },
            "to": to,
            "from": from,
            "channel": "rcs",
            "webhook_url": webhook_url
        });
    }
    sendRCS(data, callback);
}

function sendRCSButtons(to, message, buttons, webhook_url, callback) {
    const from = Config.data.FROM;
    if (!from || !to || !message) {
        return false;
    }
    let data = JSON.stringify({
        "message_type": "custom",
        "custom": {
            "contentMessage": {
                "text": message,
                "suggestions": buttons
            }
        },
        "to": to,
        "from": from,
        "channel": "rcs",
        "webhook_url": webhook_url
    });
    sendRCS(data, callback);
}

function sendRCSCard(to, card, webhook_url, callback) {
    const from = Config.data.FROM;
    if (!from || !to) {
        callback({
            success: false,
            message: 'Invalid data'
        })
        return false;
    }
    let data = JSON.stringify({
        "message_type": "custom",
        "custom": {
            "contentMessage": {
                "richCard": {
                    "standaloneCard": {
                        "thumbnailImageAlignment": "LEFT",
                        "cardOrientation": "VERTICAL",
                        "cardContent": card
                    }
                }
            }
        },
        "to": to,
        "from": from,
        "channel": "rcs",
        "webhook_url": webhook_url
    });
    sendRCS(data, callback);
}

function sendRCSCarousel(to, cards, webhook_url, callback) {
    const from = Config.data.FROM;
    if (!from || !to) {
        callback({
            success: false,
            message: 'Invalid data'
        })
        return false;
    }
    let data = JSON.stringify({
        "message_type": "custom",
        "custom": {
            "contentMessage": {
                "richCard": {
                    "carouselCard": {
                        "cardWidth": "MEDIUM",
                        "cardContents": cards
                    }
                }
            }
        },
        "to": to,
        "from": from,
        "channel": "rcs",
        "webhook_url": webhook_url
    })
    sendRCS(data, callback);
}

function sendLocationShareRequest(to, message, webhook_url, callback) {
    const from = Config.data.FROM;
    if (!from || !to) {
        callback({
            success: false,
            message: 'Invalid data'
        })
        return false;
    }
    let data = JSON.stringify({
        "message_type": "custom",
        "custom": {
            "contentMessage": {
                "text": message,
                "suggestions": [
                    {
                        "action": {
                            "text": "Share your location",
                            "postbackData": "location_data",
                            "shareLocationAction": {}
                        }
                    }
                ]
            }
        },
        "to": to,
        "from": from,
        "channel": "rcs",
        "webhook_url": webhook_url
    })
    sendRCS(data, callback);
}

function sendCalendarEntry(to, message, webhook_url, callback) {
    const from = Config.data.FROM;
    if (!from || !to) {
        callback({
            success: false,
            message: 'Invalid data'
        })
        return false;
    }
    let data = JSON.stringify({
        "message_type": "custom",
        "custom": {
            "contentMessage": {
                "text": message,
                "suggestions": [
                    {
                        "action": {
                            "text": "🎅 Save to calendar",
                            "postbackData": "calendar_entry_clicked_christmas",
                            "fallbackUrl": "https://www.google.com/calendar",
                            "createCalendarEventAction": {
                                "startTime": "2024-12-24T08:00:00+02:00",
                                "endTime": "2024-12-26T20:00:00+02:00",
                                "title": "Vonage Christmas 🎄",
                                "description": "Come to Vonage Christmas and get some RCS gifts!\n\nAgenda:\n- 9am: RCS\n- 10am: RCS\n- 11am: RCS\n- Lunch: RCS & Food\n- Afternoon: More RCS and wine!\n\nProst! 🎅🍷"
                            }
                        }
                    }
                ]
            }
        },
        "to": to,
        "from": from,
        "channel": "rcs",
        "webhook_url": webhook_url
    })
    sendRCS(data, callback);
}


//
//  INTERNAL
//
function sendRCS(data, callback) {
    try {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.nexmo.com/v1/messages',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + generateToken()
            },
            data
        };
        axios.request(config).then((response) => {
            console.log(JSON.stringify(response.data));
            callback({
                success: true,
                data: response.data
            })
        }).catch((error) => {
            console.log(error.message);
            callback({
                success: false,
                message: error.message
            })
        });
    } catch (ex) {
        console.log(ex.message);
        callback({
            success: false,
            message: ex.message
        })
    }
}

const generateToken = () => {
    if (Config.data.DEV) {
        return Config.data.JWT;
    } else {
        return tokenGenerate(applicationId, privateKey, {
            exp: Math.floor(Date.now() / 1000) + 8 * 60 * 60, // 8 hours
        })
    }
}

async function checkNumber(msisdn) {
    // Cache
    const cached = getFromCache(msisdn);
    if (cached) return cached;

    const agentId = Config.data.FROM;
    if (!agentId) {
        return { ok: false, status: 0, error: { message: 'Missing agent id' } };
    }

    const url = `/v1/channel-manager/rcs/agents/${encodeURIComponent(agentId)}/google/phones/${encodeURIComponent(msisdn)}/capabilities`;

    // up to 3 tries for 429/5xx
    const maxTries = 3;
    for (let attempt = 1; attempt <= maxTries; attempt++) {
        try {
            const token = generateToken();
            const resp = await http.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Cache-Control': 'no-cache',
                    'User-Agent': 'VONAGE-RCS/1.0'
                }
            });

            if (resp.status >= 200 && resp.status < 300) {
                const okRes = { ok: true, status: resp.status, data: resp.data };
                putInCache(msisdn, okRes);
                return okRes;
            }

            // Retry on 429 and 5xx
            if (resp.status === 429 || (resp.status >= 500 && resp.status <= 599)) {
                await backoff(attempt);
                continue;
            }

            // Hard error (4xx not 429)
            return {
                ok: false,
                status: resp.status,
                error: shapeAxiosError(resp)
            };

        } catch (e) {
            // network / timeout: retry
            if (attempt < maxTries) {
                await backoff(attempt);
                continue;
            }
            return { ok: false, status: 0, error: { message: e.message || 'Network error' } };
        }
    }
    
    // Shouldn’t hit
    return { ok: false, status: 0, error: { message: 'Unknown error' } };
}


module.exports = {
    sendRCSText,
    sendRCSVideo,
    sendRCSButtons,
    sendRCSCard,
    sendRCSCarousel,
    sendLocationShareRequest,
    sendCalendarEntry,
    checkNumber,
}

