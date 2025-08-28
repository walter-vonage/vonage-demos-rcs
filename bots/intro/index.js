const RcsUtils = require('../../work/rcs_utils');
const WEBHOOK = null;

async function action(inbound, res) {
    const message = `Welcome to this Vonage RCS Demo. To learn more and experience RCS . Please choose one of the below options. At any point during the experience you can type 'START' to come back to the beginning. 

Reply 'STOP' to opt out`
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        console.log('Welcome text sent')
    }) 

    await sleep(2000);

    const cards = [
        {
            "title": "RCS enhancing CSP experiences",
            "description": "See how a CSP can use RCS to enhance customer communications",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Jm-wZYIDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Select",
                        "postbackData": "cspmain",
                    }
                },
            ],
        },
        {
            "title": "Feeling Hungry?",
            "description": "Try ordering a tasty treat from the Vonage Bakery",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Omxh9cIDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Select",
                        "postbackData": "bakery",
                    }
                },
            ],
        },
        {
            "title": "The latest fashions",
            "description": "Engage a customer with outbound Marketing and bring them into store",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0OmxyZsKDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Select",
                        "postbackData": "fashion",
                    }
                },
            ],
        },
        {
            "title": "RCS - The whats & whys",
            "description": "Find out all about RCS and why you should be using it to engage your customers",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Jm-wZYJDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Select",
                        "postbackData": "rcsinfo",
                    }
                },
            ],
        },
        
    ]
    RcsUtils.sendRCSCarousel(inbound.phone, cards, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    action,
}