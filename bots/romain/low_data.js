const RcsUtils = require('../../work/rcs_utils');
const WEBHOOK = null;

async function action(inbound, res) {
    const name = inbound.name;
    const message = `Hi ${name}, you have used 90% of your 10GB data plan for this month. To avoid slow speeds, add more data now by choosing one of the options below.`
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        console.log('Intro sent')
    })

    await sleep(2000);

    const cards = [
        {
            "title": "Additional data top-up",
            "description": "Select preferred package",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0JnIx5ILDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Extra 5 GBs for $10",
                        "postbackData": "csplowdata_1",
                    }
                },
                {
                    "reply": {
                        "text": "Extra 10 GB for $15",
                        "postbackData": "csplowdata_2",
                    }
                },
            ],
        },
        {
            "title": "Plan Upgrade",
            "description": "Upgrade to higher tier plans with more data",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Onm2roJDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Upgrade my plan",
                        "postbackData": "csplowdata_3",
                    }
                },
            ],
        },
        {
            "title": "No extra data",
            "description": "No extra data but reduced speed",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0NnN__sJDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "I don't need extra data",
                        "postbackData": "csplowdata_4",
                    }
                },
            ],
        },        
    ]
    RcsUtils.sendRCSCarousel(inbound.phone, cards, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })

}

async function option1(inbound, res) {
    const name = inbound.name;
    const message = `Hi ${name}

your subscription has been upgraded with an *additional 5GB of data*!

You can use it until the end of the month, and any unused data will roll over to next month.`
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}



async function option2(inbound, res) {
    const name = inbound.name;
    const message = `Hi ${name}

your subscription has been upgraded with an *additional 10GB of data*!

You can use it until the end of the month, and any unused data will roll over to next month.`
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}



async function option3(inbound, res) {
    const name = inbound.name;
    const message = `Hi ${name}

We have 3 different plans that you can upgrade from your current subscriptions, please select one for more information`
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        console.log('Text sent')
    })

    await sleep(2000)

    const cards = [
        {
            "title": "5G - Plus 50$/month",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Mmtpu0LDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Upgrade to Plus",
                        "postbackData": "up_plus",
                    }
                }
            ],
        },
        {
            "title": "5G - Premium 70$/month",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Nmt2fsKDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Upgrade to PremiumPlus",
                        "postbackData": "up_premium",
                    }
                }
            ],
        },
        {
            "title": "5G - Unlimited 90$/month",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0KmDkMcIDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Upgrade to Unlimited",
                        "postbackData": "up_unlimited",
                    }
                }
            ],
        },
    ]
    RcsUtils.sendRCSCarousel(inbound.phone, cards, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}


async function option4(inbound, res) {
    const message = `You’ve chosen to stay on reduced speeds for now. No problem! If you ever want to upgrade or add more data, just ask me, and I’ll take care of it. I’m here whenever you need!`
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}



async function upgradedToPlus(inbound, res) {
    const name = inbound.name;
    const message = `Thank you, ${name}

You’ve successfully purchased the Plus plan for $20.

This will be valid for the next 7 days.

Enjoy your stay!`
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}



async function upgradedToPremium(inbound, res) {
    const name = inbound.name;
    const message = `Thank you, ${name}

You’ve successfully purchased the Premium plan for $70.

This will be valid for the next 7 days.

Enjoy your stay!`
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}


async function upgradedToUnlimited(inbound, res) {
    const name = inbound.name;
    const message = `Thank you, ${name}

You’ve successfully purchased the Unlimited plan for $90.

This will be valid for the next 7 days.

Enjoy your stay!`
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    action,
    option1,
    option2,
    option3,
    option4,
    upgradedToPlus,
    upgradedToPremium,
    upgradedToUnlimited,
}