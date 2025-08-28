const RcsUtils = require('../../work/rcs_utils');
const WEBHOOK = null;

async function action(inbound, res) {
    const name = inbound.name;
    const cards = [
        {
            "title": "APPLE iPhone 16 Pro Max",
            "description": "$800 with selected plan",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0NmtrroJDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Select this phone",
                        "postbackData": "cspphon_1",
                    }
                },
                {
                    "action": {
                        "text": "More Info",
                        "postbackData": "cspphon_1_2",
                        "openUrlAction": {
                            "url": "https://www.apple.com/iphone-16-pro/"
                        }
                    }
                },
            ],
        },
        {
            "title": "SAMSUNG Galaxy S25 Ultra",
            "description": "$790 with selected plan",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0LGcy5wJDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Select this phone",
                        "postbackData": "cspphon_2",
                    }
                },
                {
                    "action": {
                        "text": "More Info",
                        "postbackData": "cspphon_2_2",
                        "openUrlAction": {
                            "url": "https://www.samsung.com/us/smartphones/galaxy-s25-ultra/buy/galaxy-s25-ultra-512gb-unlocked-sm-s938uztexaa/?modelCode=SM-S938UZTEXAA"
                        }
                    }
                },
            ],
        },
        {
            "title": "Ask Rob the AI Assistant",
            "description": "Our AI Assistant will help you choose the perfect phone, or answer any of your questions",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Onm2oYLDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Chat with Rob",
                        "postbackData": "ai",
                    }
                },
            ],
        },
        
    ]
    RcsUtils.sendRCSCarousel(inbound.phone, cards, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}

async function redirectToPayment(inbound, res) {
    const name = inbound.name;
    const message = `Great choice, ${name}!`
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        console.log('Great choice!')
    })

    await sleep(2000);

    //  Payment for a plan
    const bot = require('./payment')
    await bot.action(inbound, res)
    
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    action,
    redirectToPayment,
}
