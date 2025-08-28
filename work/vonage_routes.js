const fs = require('fs').promises;
const path = require('path');
const DATA_DIR = path.join(__dirname, '../', 'data');
const SLOTS_PATH = path.join(DATA_DIR, 'slots.json');
const USERS_PATH = path.join(DATA_DIR, 'users.json');

function action(app) {

    // Vonage route
    app.get('/vonage', (req, res) => {
        if (req.session.user) return res.redirect('/vonage/dashboard');
        res.render('sales', { error: null });
    });

    app.post('/vonage/login', async (req, res) => {
        const { email, password } = req.body;
        const raw = await fs.readFile(USERS_PATH, 'utf-8');
        const users = JSON.parse(raw);
        const user = users.find(u => u.email === email && u.password === password);

        req.session.attempts = req.session.attempts || 0;

        if (user) {
            req.session.user = user;
            req.session.attempts = 0;
            return res.redirect('/vonage/dashboard');
        } else {
            req.session.attempts++;
            if (req.session.attempts >= 3) {
                return res.send('Too many failed attempts. Access denied.');
            }
            return res.render('sales', { error: `Invalid credentials (${req.session.attempts}/3)` });
        }
    });

    app.get('/vonage/dashboard', async (req, res) => {
        if (!req.session.user) return res.redirect('/vonage');
        const raw = await fs.readFile(SLOTS_PATH, 'utf-8');
        const slots = JSON.parse(raw);
        res.render('sales_dashboard', { slots, user: req.session.user });
    });

    // Vonage - CRUD Endpoints 
    app.post('/vonage/add-slot', async (req, res) => {
        if (!req.session.user) return res.status(401).send('Unauthorized');
        const { date, time } = req.body;
        const raw = await fs.readFile(SLOTS_PATH, 'utf-8');
        const slots = JSON.parse(raw);
        slots.push({ date, time, available: true });
        await fs.writeFile(SLOTS_PATH, JSON.stringify(slots, null, 2));
        res.redirect('/vonage/dashboard');
    });

    app.post('/vonage/delete-slot', async (req, res) => {
        if (!req.session.user) return res.status(401).send('Unauthorized');
        const { index } = req.body;
        const raw = await fs.readFile(SLOTS_PATH, 'utf-8');
        const slots = JSON.parse(raw);
        slots.splice(index, 1);
        await fs.writeFile(SLOTS_PATH, JSON.stringify(slots, null, 2));
        res.redirect('/vonage/dashboard');
    });

    //  Return dates. Always return at least 3 values
    app.get('/vonage/slots', async (req, res) => {
        try {
            const raw = await fs.readFile(SLOTS_PATH, 'utf-8');
            const slots = JSON.parse(raw || '[]');

            const formatter = new Intl.DateTimeFormat('en-GB', { month: 'long', day: 'numeric' });

            // Filter available + format date
            let availableSlots = slots
                .filter(slot => slot.available === true)
                .map(slot => ({
                    ...slot,
                    date: formatter.format(new Date(slot.date)), // "21 August"
                    real_date: slot.date                          // original "2025-08-21"
                }));

            // Pad with "No available" if less than 3
            while (availableSlots.length < 3) {
                availableSlots.push({
                    date: "No available",
                    real_date: "",
                    time: "",
                    available: false
                });
            }

            res.json(availableSlots);
        } catch (err) {
            console.error('Error reading slots:', err);
            res.status(500).send('Internal Server Error');
        }
    });

    app.post('/vonage/logout', (req, res) => {
        req.session.destroy(() => res.redirect('/vonage'));
    });
    
}

module.exports = {
    action
}