const RcsUtils = require('../../work/rcs_utils');
const WEBHOOK = null;

async function action(inbound, res) {
    const message = `Welcome to Vonage Events RCS CSP demo.

Send "cspstart" at any time to land back on this menu.

👇 Please choose a demo below 👇 `
    const buttons = [
        {
            "reply": {
                "text": "Demo - Low Data",
                "postbackData": "csplowdata",
            }
        },
        {
            "reply": {
                "text": "Demo - Roaming",
                "postbackData": "csproaming",
            }
        },
        {
            "reply": {
                "text": "Demo - Subscription Renew",
                "postbackData": "csprenew",
            }
        },
        {
            "reply": {
                "text": "Demo - Late Payment",
                "postbackData": "csplatepay",
            }
        },
        
    ]
    RcsUtils.sendRCSButtons(inbound.phone, message, buttons, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}


module.exports = {
    action,
}