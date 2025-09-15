const RcsUtils = require('../../work/rcs_utils');
const WEBHOOK = null;

async function action(inbound, res) {
    const message = `Hello, ${inbound.name}. Need some help? no problem.

For help from Vonage with any of our products you can reach us on the link below.

For opting out of this RCS Messaging service you can send us Stop at anytime.

Or if you want to get the first message again just click startover

#TeamVonage`;
    const buttons = [
        {
            "action": {
                "text": "Contact Vonage",
                "postbackData": "contact",
                "openUrlAction": {
                    "url": "https://www.vonage.co.uk/contact-us/"
                }
            }
        },
    ]
    RcsUtils.sendRCSButtons(inbound.phone, message, buttons, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })

//     message = `Intro / Dreamforce Event
// Trigger Words: intro, hello, start, startover, start over, dreamforce

// Vonage Demos
// Trigger Words: demos

// CSP (Customer Service Provider)
// Trigger Words: cspmain, cspstart

// Bakery
// Trigger Word: bakery

// Fashion
// Trigger Word: fashion

// What is RCS
// Trigger Word: rcsinfo`
//     RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
//         res.status(200).json({ success: true })
//     }) 


}

module.exports = {
    action
}