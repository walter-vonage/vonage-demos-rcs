const RcsUtils = require('../../work/rcs_utils');
const WEBHOOK = null;
const axios = require('axios');

async function action(inbound, res) {
    const cards = [
        {
            "title": "RCS Use Cases",
            "description": "Check out these popular RCS use cases.",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0N779_MLDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Show me",
                        "postbackData": "rcsinfo_1",
                    }
                },
            ],
        },
        {
            "title": "RCS @ Vonage",
            "description": "Take a look at Vonage can offer with RCS today",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0P7Ev-ILDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "action": {
                        "text": "What is RCS?",
                        "postbackData": "rcsinfo_2",
                        "openUrlAction": {
                            "url": "https://www.vonage.com/resources/articles/rich-communication-services/"
                        }                        
                    }
                },
            ],
        },
        {
            "title": "Send yourself sample messages",
            "description": "Click below to get a choice of sample messages and end to end user flows.",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0P6k_ZUIDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Send me sample messages",
                        "postbackData": "rcsinfo_3",
                    }
                },
            ],
        },
        {
            "title": "RCS Benefits",
            "description": "Drive more engagement and trust through RCS. Check out how.",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Nmc1ZQJDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Benefits",
                        "postbackData": "rcsinfo_4",
                    }
                },
            ],
        },
        
    ]
    RcsUtils.sendRCSCarousel(inbound.phone, cards, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}

async function executeForRCSUseCases(inbound, res) {
    try {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://neru-fbc66a14-rcsdemo-dev.euw1.runtime.vonage.cloud/sendrcs',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                "sample": 'usecases',
                "phone": inbound.phone
            })
        };
        axios.request(config).then((response) => {
            console.log('response', response)
            RcsUtils.sendRCSText(inbound.phone, 'Thank you. We will show you use cases', WEBHOOK, () => {
                res.status(200).json({ success: true })
            })
        }).catch((error) => {
            console.log(error.message);
            RcsUtils.sendRCSText(inbound.phone, `I'm sorry but there was an error sending this request. Try again.`, WEBHOOK, () => {
                res.status(200).json({ success: true })
            })
        });
    } catch(ex) {
        console.log(ex.message);
        RcsUtils.sendRCSText(inbound.phone, `I'm sorry but there was an error sending this request. Try again.`, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })    
    }
}

async function sendmeRichcards(inbound, res) {
    try {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://neru-fbc66a14-rcsdemo-dev.euw1.runtime.vonage.cloud/sendrcs',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                "sample": 'richcard',
                "phone": inbound.phone
            })
        };
        axios.request(config).then((response) => {
            console.log('response', response)
            res.status(200).json({ success: true })
        }).catch((error) => {
            console.log(error.message);
            RcsUtils.sendRCSText(inbound.phone, `I'm sorry but there was an error sending this request. Try again.`, WEBHOOK, () => {
                res.status(200).json({ success: true })
            })
        });
    } catch(ex) {
        console.log(ex.message);
        RcsUtils.sendRCSText(inbound.phone, `I'm sorry but there was an error sending this request. Try again.`, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })    
    }
}


async function showBenefits(inbound, res) {
    const cards = [
        {
            "title": "Key Benefits",
            "description": "To get to know some key benefits or RCS, scroll right...",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0P7EqOQIDA",
                    "forceRefresh": "false"
                }
            },
        },
        {
            "title": "Verified Business Profile",
            "description": "Get your business verified by the users mobile operator for better brand image and trust.",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0P6kxOsJDA",
                    "forceRefresh": "false"
                }
            },
        },
        {
            "title": "Rich Messaging",
            "description": "Share media, suggested replies, locations, calendar entries and more with your users.",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0O6j-fkKDA",
                    "forceRefresh": "false"
                }
            },
        },
        {
            "title": "Better Reach",
            "description": "Preinstalled on all devices. Reach 1.5 bln users today & 3 bln by end of 2025.",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0J7m_ogLDA",
                    "forceRefresh": "false"
                }
            },
        },
        {
            "title": "iOS Support",
            "description": "Apple rollout will bump RCS users in Germany to 70-80% in 2024. More than on Whatsapp!",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0P62stcKDA",
                    "forceRefresh": "false"
                }
            },
        },
        {
            "title": "Automatic SMS failover",
            "description": "For any device that does not yet support RCS, automatic failover to SMS is possible.",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0N7p44ILDA",
                    "forceRefresh": "false"
                }
            },
        },
        {
            "title": "No Smishing",
            "description": "Anyone can send SMS in your name. With RCS, no one can impersonate you anymore.",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0L69nYAJDA",
                    "forceRefresh": "false"
                }
            },
        },
        {
            "title": "Competitive Pricing",
            "description": "RCS costs the same as SMS. Pay per message. Monthly active user and conversation models available.",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0N6WqekLDA",
                    "forceRefresh": "false"
                }
            },
        },
        
    ]
    RcsUtils.sendRCSCarousel(inbound.phone, cards, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}

module.exports = {
    action,
    executeForRCSUseCases,
    showBenefits,
    sendmeRichcards
}