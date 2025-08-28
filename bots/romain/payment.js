const RcsUtils = require('../../work/rcs_utils');
const WEBHOOK = null;

async function action(inbound, res) {
    const name = inbound.name;

    const message = `Dear ${name}. 
    
When you are ready, click on "Proceed to Payment" to be redirected to our payment system and complete the transaction.

👇👇👇

https://vonage-rcspaymentdemo.netlify.app/?plan=xb*hdbckd_i289jcdee`
    const buttons = [
        {
            "reply": {
                "text": "Proceed to Payment",
                "postbackData": "csppayment_1",
            }
        },            
    ]
    RcsUtils.sendRCSButtons(inbound.phone, message, buttons, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}

async function pay(inbound, res) {
    const message = `Your subscription has been renewed! 🎉

Your phone will be shipped to your address within 3-5 business days.

Your plan will take effect starting March 16th.

Enjoy your new device and plan!`
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}

module.exports = {
    action,
    pay,
}