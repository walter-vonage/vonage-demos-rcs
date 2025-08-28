const RcsUtils = require('../../work/rcs_utils');
const WEBHOOK = null;

async function action(inbound, res) {
    const name = inbound.name;
    const message = `Hi ${name}, we noticed your payment for this month’s subscription of $42.90 is overdue.

    Let’s get this sorted quickly so you can continue enjoying uninterrupted services.
    
    Choose a payment option below:`
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        console.log('Intro sent')
    })

    await sleep(2000);

    const cards = [
        {
            "title": "Pay Full Amount Now",
            "description": "Choose a payment option below",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Nmt2fsLDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Credit Card",
                        "postbackData": "csplatepay_1",
                    }
                },
            ],
        },
        {
            "title": "Instalments",
            "description": "Pay in Installments: 50% Now, 50% Later",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0NmNtOEIDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Credit/Debit Card",
                        "postbackData": "csplatepay_2",
                    }
                },
            ],
        },
        {
            "title": "Extend Due Date",
            "description": "Service Fees Apply",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0LGcnKoKDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Extend",
                        "postbackData": "csplatepay_3",
                    }
                },
            ],
        },
        {
            "title": "Contact Support",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0KnWo4MIDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Contact Support",
                        "postbackData": "csplatepay_4",
                    }
                },
            ],
        },
    ]
    RcsUtils.sendRCSCarousel(inbound.phone, cards, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}


async function pay(id, inbound, res) {
    const name = inbound.name;
    let message = '';
    let buttons = []
    
    if (id == 1) {
        message = `Thank you ${name} for choosing to pay the full amount. 

You will be charged $42.90 on your credit card ending with "**26" on 2025/03/15.`
        buttons = [
            {
                "reply": {
                    "text": "Confirm",
                    "postbackData": "csplatepay_5",
                }
            },            
        ]
    }
    if (id == 2) {
        message = `You've chosen to pay in instalments.

You will be charged $21.45 on your credit card ending with "**26" on 2025/03/15.`
        buttons = [
            {
                "reply": {
                    "text": "Confirm",
                    "postbackData": "csplatepay_6",
                }
            },            
        ]
    }
    if (id == 3) {
        message = `You’ve chosen to extend your due date.

A service fee of $4.90 will be added to your bill.

Confirm to proceed.`
        buttons = [
            {
                "reply": {
                    "text": "Confirm Extension",
                    "postbackData": "csplatepay_7",
                }
            },            
            {
                "reply": {
                    "text": "Cancel",
                    "postbackData": "csplatepay",
                }
            },            
        ]
    }
    if (id == 4) {
        message = `We’re here to help!

You can contact our support team at +1 1234 5678 or chat with a live agent.`
        buttons = [
            {
                "reply": {
                    "text": "Chat with agent",
                    "postbackData": "csplatepay_8",
                }
            },            
        ]
    }
    RcsUtils.sendRCSButtons(inbound.phone, message, buttons, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}


async function confirmation(id, inbound, res) {
    const name = inbound.name;
    let message = '';    
    if (id == 1) {
        message = `Thank you ${name} 

Your payment of $42.90 has been received.

Your subscription is now up to date. Enjoy our services!`
    }
    if (id == 2) {
        message = `Thank you, ${name}

Your first payment of $21.45 has been received.

Your next payment of $21.45 is due by 2025.03.30.

Need help? Just ask!`
    }
    if (id == 3) {
        message = `Thank you ${name}

Your due date has been extended.

A service fee of $4.90 has been added to your total balance.

Let us know if you need further assistance.`
    }
    if (id == 4) {
        message = `An agent is contacting you soon.`
    }
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    action,
    pay,
    confirmation,
}