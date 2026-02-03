const axios = require('axios');
const fs = require('fs');
const path = require('path');

const MAP_FILE = path.join(__dirname, '../webhook-map.json');

function loadMap() {
    try {
        if (!fs.existsSync(MAP_FILE)) {
            return {};
        }
        const content = fs.readFileSync(MAP_FILE, 'utf-8');
        return JSON.parse(content);
    } catch (err) {
        console.error('Error loading webhook-map.json:', err);
        return {};
    }
}

async function redirectIfNeeded(phone, body) {
    const map = loadMap();
    const config = map[phone];

    if (!config || !config.url) {
        return false;
    }

    try {
        const options = {
            method: config.method || 'POST',
            url: config.url,
            data: body
        };

        if (config.headers) {
            options.headers = config.headers;
        }

        await axios(options);
        console.log(`✅ Redirected webhook for ${phone} to ${config.url}`);
        return true;
    } catch (err) {
        console.error(`❌ Error redirecting webhook for ${phone}:`, err.message);
        return false;
    }
}

module.exports = {
    redirectIfNeeded
};