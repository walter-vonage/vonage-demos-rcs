const RcsUtils = require('../../work/rcs_utils');
const WEBHOOK = null;

async function action(inbound, res) {
    const message = `Intro
Trigger Words: intro, hello, start

Dreamforce Event
Trigger Words: dreamforce

CSP (Customer Service Provider)
Trigger Words: cspmain, cspstart

Bakery
Trigger Word: bakery

Fashion
Trigger Word: fashion

What is RCS
Trigger Word: rcsinfo`
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        res.status(200).json({ success: true })
    }) 
}

module.exports = {
    action
}