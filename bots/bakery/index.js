const RcsUtils = require('../../work/rcs_utils');
const WEBHOOK = null;

async function action(inbound, res) {
    const card = {
            "title": "Welcome to Vonage Bakery!",
            "description": "How would you like to receive your order?",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Nn0t8sKDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Select In-Store",
                        "postbackData": "bakery_1",
                    }
                },
                {
                    "reply": {
                        "text": "Select Delivery",
                        "postbackData": "bakery_2",
                    }
                },
            ],
        }
    RcsUtils.sendRCSCard(inbound.phone, card, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}

async function bakeryOption(id, inbound, res) {
    if (id == 1) {
        //  Select Pastry or Hot Drinks
        const cards = [
            {
                "title": "Pastries",
                "description": "Freshly baked and irresistibly delicious pastries",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0MnKseYJDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "Select Pastry",
                            "postbackData": "bakery_3",
                        }
                    },
                ],
            },        
            {
                "title": "Hot Drinks",
                "description": "Warm up with our selection of comforting hot drinks, perfect for any time of day",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0MnKseYJDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "Select Hot drink",
                            "postbackData": "bakery_4",
                        }
                    },
                ],
            },        
        ]
        RcsUtils.sendRCSCarousel(inbound.phone, cards, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    }
    else if (id == 2) {
        //  Sorry, no delivery
        const message = `Sorry but deliver is not currently available.`;
        const buttons = [
            {
                "reply": {
                    "text": "Take me back",
                    "postbackData": "bakery",
                }
            },            
        ]
        RcsUtils.sendRCSButtons(inbound.phone, message, buttons, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    }
    else if (id == 3) {
        //  Menu - Pastries
        const card = {
                "title": "Select Freshly baked and irresistibly delicious pastries",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0JmAwrYIDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "Almond Croissant",
                            "postbackData": "bakery_5",
                        }
                    },
                    {
                        "reply": {
                            "text": "Chocolate Éclair",
                            "postbackData": "bakery_6",
                        }
                    },
                    {
                        "reply": {
                            "text": "Pain au Chocolat",
                            "postbackData": "bakery_7",
                        }
                    },
                    {
                        "reply": {
                            "text": "Danish Pastry",
                            "postbackData": "bakery_8",
                        }
                    },
                ],
            }
        RcsUtils.sendRCSCard(inbound.phone, card, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    }
    else if (id == 4) {
        //  Menu Hot Drinks
        const card = {
                "title": "Choose your perfect hot drink to warm up and enjoy",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0KmlrqkJDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "Americano",
                            "postbackData": "bakery_9",
                        }
                    },
                    {
                        "reply": {
                            "text": "Cappuccino",
                            "postbackData": "bakery_10",
                        }
                    },
                    {
                        "reply": {
                            "text": "Flat White",
                            "postbackData": "bakery_11",
                        }
                    },
                    {
                        "reply": {
                            "text": "Hot Chocolate",
                            "postbackData": "bakery_12",
                        }
                    },
                ],
            }
        RcsUtils.sendRCSCard(inbound.phone, card, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    }
    else if (id >= 5 && id <= 8) {
        //  Almond Croisant
        //  Chocolate Éclair 
        //  Pain au Chocolat
        //  Danish Pastry
        const message = `Excellent choice. Would you like to add more?`;
        const buttons = [
            {
                "reply": {
                    "text": "Yes, please",
                    "postbackData": "bakery_3",
                }
            },            
            {
                "reply": {
                    "text": "No, thanks",
                    "postbackData": "bakery_13",
                }
            },            
        ]
        RcsUtils.sendRCSButtons(inbound.phone, message, buttons, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    }
    else if (id >= 9 && id <= 12) {
        //  Americano
        //  Cappuccino
        //  Flat White
        //  Hot Chocolate
        const message = `Great choice! Do you want to add another one?`;
        const buttons = [
            {
                "reply": {
                    "text": "Yes, please",
                    "postbackData": "bakery_4",
                }
            },            
            {
                "reply": {
                    "text": "No, thanks",
                    "postbackData": "bakery_14",
                }
            },            
        ]
        RcsUtils.sendRCSButtons(inbound.phone, message, buttons, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    }
    else if (id == 13) {
        //  Checkout from Pastry
        const card = {
                "title": "Do you have everything you need?",
                "description": "Are you sure you have all the hot drinks you need to enjoy those pastries?",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0KmUrIsJDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "Yes, Checkout now",
                            "postbackData": "bakery_15",
                        }
                    },
                    {
                        "reply": {
                            "text": "Select Hot Drinks",
                            "postbackData": "bakery_4",
                        }
                    },
                ],
            }
        RcsUtils.sendRCSCard(inbound.phone, card, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    }
    else if (id == 14) {
        //  Checkout from Hot Drinks
        const card = {
                "title": "Do you have everything you need?",
                "description": "Do you have enough freshly baked pastry to go with your hot drink?",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0JmAws4LDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "Yes, Checkout now",
                            "postbackData": "bakery_15",
                        }
                    },
                    {
                        "reply": {
                            "text": "Select Pastry",
                            "postbackData": "bakery_3",
                        }
                    },
                ],
            }
        RcsUtils.sendRCSCard(inbound.phone, card, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    }
    else if (id == 15) {
        //  Checkout
        const card = {
                "title": "How would you like to pay?",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0JmAws4LDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "action": {
                            "text": "Pay by Card",
                            "postbackData": "bakery_16",
                            "openUrlAction": {
                                "url": "https://neru-fbc66a14-rcsdemo-dev.euw1.runtime.vonage.cloud/show-payment?provider=card&phone=" + inbound.phone
                            }
                        }
                    },
                    {
                        "action": {
                            "text": "Pay with Paypal",
                            "postbackData": "bakery_17",
                            "openUrlAction": {
                                "url": "https://neru-fbc66a14-rcsdemo-dev.euw1.runtime.vonage.cloud/show-payment?provider=paypal&phone=" + inbound.phone
                            }
                        }
                    },
                    {
                        "reply": {
                            "text": "Pay In Store",
                            "postbackData": "bakery_18",
                        }
                    },
                ],
            }
        RcsUtils.sendRCSCard(inbound.phone, card, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    }
    else if (id == 18) {
        //  Pay In Store
        const card = {
                "title": "Great, please present this QR code to the cashier.",
                "description": "Collect your goods in store.",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Nn1gpEIDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                ],
            }
        RcsUtils.sendRCSCard(inbound.phone, card, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    }
}

module.exports = {
    action,
    bakeryOption,
}