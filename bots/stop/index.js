const RcsUtils = require('../../work/rcs_utils');
const WEBHOOK = null;

async function action(inbound, res) {
    const message = `Sorry to see you go 😢. You have been unsubscribed from future RCS messaging. Type 'START' to opt back in.`
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        res.status(200).json({ success: true })
    }) 
}

module.exports = {
    action
}