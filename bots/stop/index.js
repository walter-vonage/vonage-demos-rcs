const RcsUtils = require('../../work/rcs_utils');
const WEBHOOK = null;

async function action(inbound, res) {
    const message = `Of course. Sorry to see you go. 
    
You have been unsubscribed from future RCS messaging from Vonage.

If you want to come back just Type “Start” to opt back in.

#TeamVonage`
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        res.status(200).json({ success: true })
    }) 
}

module.exports = {
    action
}