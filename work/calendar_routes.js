const path = require('path');
const fs = require('fs').promises;
const DATA_DIR = path.join(__dirname, '../', 'data');
const SLOTS_PATH = path.join(DATA_DIR, '../', 'slots.json');

function action(app) {

    // Calendar route
    app.get('/calendar', async (req, res) => {
        try {
            const raw = await fs.readFile(path.join(__dirname, 'data', 'slots.json'), 'utf-8');
            const slots = JSON.parse(raw);
            res.render('calendar', { slots, config: Config });
        } catch (err) {
            console.error('Error loading slots:', err);
            res.status(500).send('Unable to load calendar');
        }
    });
    
    app.post('/calendar/book', async (req, res) => {
        try {
            const { index, name, email, phone } = req.body;
            const raw = await fs.readFile(SLOTS_PATH, 'utf-8');
            const slots = JSON.parse(raw);

            if (!slots[index] || !slots[index].available) {
                return res.json({ success: false, message: 'Slot unavailable' });
            }

            slots[index].available = false;
            slots[index].bookedBy = { name, email, phone };

            await fs.writeFile(SLOTS_PATH, JSON.stringify(slots, null, 2));
            res.json({ success: true });
        } catch (err) {
            console.error('Booking error:', err);
            res.json({ success: false });
        }
    });
}

module.exports = {
    action
}