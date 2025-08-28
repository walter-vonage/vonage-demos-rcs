const RcsUtils = require('../../work/rcs_utils');
const WEBHOOK = null;

async function action(inbound, res) {
    const name = inbound.name;
    const message = `Hi ${name} and Welcome! 🌍

We’ve got you covered with the best data packages for your stay.

Choose an option below to stay connected:`
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        console.log('Intro sent')
    })

    await sleep(2000);

    const cards = [
        {
            "title": "1GB Data for $5",
            "description": "Valid for 7 Days",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Onm2roLDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Select this package",
                        "postbackData": "roaming_1",
                    }
                },
            ],
        },
        {
            "title": "5GB Data for $20",
            "description": "Valid for 30 Days",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Nni-qkKDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Select this package",
                        "postbackData": "roaming_2",
                    }
                },
            ],
        },
        {
            "title": "Unlimited Data for $50",
            "description": "Valid for 30 Days",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Om5i5EJDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Select this package",
                        "postbackData": "roaming_3",
                    }
                },
            ],
        },
        {
            "title": "No package",
            "description": "Pay-as-you-go for $0.10/MB",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0KmDkMcKDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Select this package",
                        "postbackData": "roaming_4",
                    }
                },
            ],
        },
    ]
    RcsUtils.sendRCSCarousel(inbound.phone, cards, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}


async function roaming(id, inbound, res) {
    const name = inbound.name;
    let message = `Thank you, ${name}
    
`;
    if (id == 1) {
        message += `
You’ve successfully purchased 1GB of data for $5.

This will be valid for the next 7 days. Enjoy your stay! 🌟`
    }
    if (id == 2) {
        message += `
You’ve successfully purchased 5GB of data for $20.

This will be valid for the next 7 days. Enjoy your stay! 🌟`
    }
    if (id == 3) {
        message += `
You’ve chosen the Unlimited Data package for $50. Your plan is now active and valid for the next 30 days.

Enjoy unlimited browsing and sharing! 🌐`
    }
    if (id == 4) {
        message += `
You’ll be using pay-as-you-go data at $0.10/MB while in Spain.

 If you’d like to switch to a package later, just let me know. Have a great time! ✈️`
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
    roaming,
}