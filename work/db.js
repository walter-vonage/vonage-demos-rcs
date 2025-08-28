const fsp = require('fs/promises');
const path = require('path');
const DATA_DIR = path.join(__dirname, '../', 'data');
const DB_FILE = path.join(DATA_DIR, 'rcs_qr_users.json');

async function loadDb() {
    try {
        const buf = await fsp.readFile(DB_FILE, 'utf8');
        return JSON.parse(buf || '{}');
    } catch {
        return {};
    }
}

async function saveDb(dbObj) {
    await fsp.mkdir(DATA_DIR, { recursive: true });
    const tmp = DB_FILE + '.tmp';
    await fsp.writeFile(tmp, JSON.stringify(dbObj, null, 2), 'utf8');
    await fsp.rename(tmp, DB_FILE);
}

async function upsertContact(phone, name) {
    if (!phone) return; // nothing to store
    const key = phone;
    if (!key) return;
    const db = await loadDb();
    db[key] = { name, updatedAt: new Date().toISOString() };
    await saveDb(db);
}

async function getNameByPhone(phone) {
    if (!phone) return null;
    const db = await loadDb();
    const entry = db[phone];
    return entry ? entry.name : null;
}

module.exports = {
    loadDb,
    saveDb,
    upsertContact,
    getNameByPhone,
}