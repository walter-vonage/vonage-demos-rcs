const RcsUtils = require('../../work/rcs_utils');
const WEBHOOK = null;

async function action(inbound, res) {
    const message = `Check out the New Vonage Spring Collection.`;
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        console.log('Fashion flow started')
    })

    await sleep(2000)

    const card = {
        "title": "What's your preference",
        "media": {
            "height": "MEDIUM",
            "contentInfo": {
                "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0OnjnuYIDA",
                "forceRefresh": "false"
            }
        },
        "suggestions": [
            {
                "reply": {
                    "text": "Women",
                    "postbackData": "fashion_1",
                }
            },
            {
                "reply": {
                    "text": "Men",
                    "postbackData": "fashion_2",
                }
            },
        ],
    }
    RcsUtils.sendRCSCard(inbound.phone, card, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })

}

async function fashion(id, inbound, res) {
    if (id == 1) {
        //  Women
        const cards = [
            {
                "title": "Top Fashion for Women",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0JnPgLAIDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Clothing",
                            "postbackData": "fashion_3",
                        }
                    },
                ],
            },        
            {
                "title": "The Perfect Footwear Collection",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0KmnvOMLDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Footwear",
                            "postbackData": "fashion_4",
                        }
                    },
                ],
            },        
            {
                "title": "Accessories for Every Style",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0LHdlvoIDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "Accessorise Me",
                            "postbackData": "fashion_5",
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
        //  Men
        const cards = [
            {
                "title": "Top Fashion for Men",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Mm1w5wKDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Clothing",
                            "postbackData": "fashion_6",
                        }
                    },
                ],
            },        
            {
                "title": "The Perfect Footwear Collection",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0MnKmboJDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Footwear",
                            "postbackData": "fashion_7",
                        }
                    },
                ],
            },        
            {
                "title": "Accessories for Every Style",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Jm-2vsJDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "Accessorise Me",
                            "postbackData": "fashion_8",
                        }
                    },
                ],
            },        
        ]
        RcsUtils.sendRCSCarousel(inbound.phone, cards, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    }
    else if (id == 3) {
        //  Women - See Clothing
        const cards = [
            {
                "title": "Stay Warm in Style",
                "description": "Chic and cozy coats for every season",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0JnA7NsIDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Coats",
                            "postbackData": "fashion_9",
                        }
                    },
                ],
            },        
            {
                "title": "Stylish & Timeless Dresses",
                "description": "Elegance meets style – discover stunning dresses for every occasion",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0LGMx58IDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Dresses",
                            "postbackData": "fashion_10",
                        }
                    },
                ],
            },        
            {
                "title": "Step into Style with Our Jeans Collection",
                "description": "Find your perfect fit – stylish, comfortable, and trendy women's jeans await",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Nn0n_kKDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Jeans",
                            "postbackData": "fashion_11",
                        }
                    },
                ],
            },        
        ]
        RcsUtils.sendRCSCarousel(inbound.phone, cards, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    }
    else if (id == 4) {
        //  Women - Footwear
        const cards = [
            {
                "title": "Chic & Versatile Boots for Every Occasion",
                "description": "Step up in style – trendy and comfortable boots for every occasion",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Mm1w8kKDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Boots",
                            "postbackData": "fashion_12",
                        }
                    },
                ],
            },        
            {
                "title": "Shoes That Elevate Your Look",
                "description": "Stylish and comfortable women's shoes for every step",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0JmPm4UKDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Shoes",
                            "postbackData": "fashion_13",
                        }
                    },
                ],
            },        
            {
                "title": "Walk with Ease in Our Trendy Sandals",
                "description": "Step into elegance – chic and comfy women's sandals",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0OnKk6cKDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Sandals",
                            "postbackData": "fashion_14",
                        }
                    },
                ],
            },        
        ]
        RcsUtils.sendRCSCarousel(inbound.phone, cards, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    }
    else if (id == 5) {
        //  Women - Accessories
        const cards = [
            {
                "title": "Bags That Complete Your Outfit",
                "description": "Carry style with you – chic and trendy women's bags",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0OnKtNYLDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Bags",
                            "postbackData": "fashion_15",
                        }
                    },
                ],
            },        
            {
                "title": "Dazzling Jewellery That Makes a Statement",
                "description": "Elegant jewellery to elevate your style",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0KnH4_MKDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Jewellery",
                            "postbackData": "fashion_16",
                        }
                    },
                ],
            },        
            {
                "title": "Trendy, Bold & Elegant Sunglasses",
                "description": "Trendy sunglasses for a flawless look",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0OmT05oLDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Sunglasses",
                            "postbackData": "fashion_17",
                        }
                    },
                ],
            },        
        ]
        RcsUtils.sendRCSCarousel(inbound.phone, cards, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    }
    else if (id == 6) {
        //  Men - See Clothing
        const cards = [
            {
                "title": "Blazers That Suit Every Look",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Mn1nt4JDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Blazers",
                            "postbackData": "fashion_28",
                        }
                    },
                ],
            },        
            {
                "title": "Wrap Yourself in the Best Cashmere",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0LHHmqULDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Cashmere",
                            "postbackData": "fashion_29",
                        }
                    },
                ],
            },        
            {
                "title": "Find the Perfect Pair of Jeans",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Omqr9sIDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Jeans",
                            "postbackData": "fashion_30",
                        }
                    },
                ],
            },        
        ]
        RcsUtils.sendRCSCarousel(inbound.phone, cards, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    }
    else if (id == 7) {
        //  Men - Footwear
        const cards = [
            {
                "title": "Chic & Versatile Boots for Every Occasion",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Omx3fsLDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Boots",
                            "postbackData": "fashion_31",
                        }
                    },
                ],
            },        
            {
                "title": "Trainers That Elevate Your Look",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0NnM7r4KDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Trainers",
                            "postbackData": "fashion_32",
                        }
                    },
                ],
            },        
            {
                "title": "Walk with Ease in Our Trendy Shoes",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0NmsiJMIDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Shoes",
                            "postbackData": "fashion_33",
                        }
                    },
                ],
            },        
        ]
        RcsUtils.sendRCSCarousel(inbound.phone, cards, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    }
    else if (id == 8) {
        //  Men - Accessories
        const cards = [
            {
                "title": "Bags That Complete Your Outfit",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Mnq4ZcIDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Bags",
                            "postbackData": "fashion_34",
                        }
                    },
                ],
            },        
            {
                "title": "These Belts Make a Statement",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0JmCo9ILDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Belts",
                            "postbackData": "fashion_35",
                        }
                    },
                ],
            },        
            {
                "title": "Trendy, Bold & Elegant Hats",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Mnq4ZcKDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "See Hats",
                            "postbackData": "fashion_36",
                        }
                    },
                ],
            },        
        ]
        RcsUtils.sendRCSCarousel(inbound.phone, cards, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    }
    else if (id == 9) {
        //  Women - See Coats
        await womenItemSelected(inbound, res);
    }
    else if (id == 10) {
        //  Women - See Dresses
        await womenItemSelected(inbound, res);
    }
    else if (id == 11) {
        //  Women - See Jeans
        await womenItemSelected(inbound, res);
    }
    else if (id == 12) {
        //  Women - See Boots
        await womenItemSelected(inbound, res);
    }
    else if (id == 13) {
        //  Women - See Shoes
        await womenItemSelected(inbound, res);
    }
    else if (id == 14) {
        //  Women - See Sandals
        await womenItemSelected(inbound, res);
    }
    else if (id == 15) {
        //  Women - See Bags
        await womenItemSelected(inbound, res);
    }
    else if (id == 16) {
        //  Women - See Jewellery
        await womenItemSelected(inbound, res);
    }
    else if (id == 17) {
        //  Women - See Sunglasses
        await womenItemSelected(inbound, res);
    }
    else if (id == 18) {
        //  Women - Book Now
        const cards = [
            {
                "title": "London",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0LHM15kLDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "Select London",
                            "postbackData": "fashion_19",
                        }
                    },
                ],
            },        
            {
                "title": "Madrid",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0OmqlYkIDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "Select Madrid",
                            "postbackData": "fashion_20",
                        }
                    },
                ],
            },        
            {
                "title": "Milan",
                "media": {
                    "height": "MEDIUM",
                    "contentInfo": {
                        "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0JmgsdQLDA",
                        "forceRefresh": "false"
                    }
                },
                "suggestions": [
                    {
                        "reply": {
                            "text": "Select Milan",
                            "postbackData": "fashion_21",
                        }
                    },
                ],
            },        
        ]
        RcsUtils.sendRCSCarousel(inbound.phone, cards, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    }
    else if (id == 19) {
        //  Select London
        await selectDate('London', inbound, res);
    }
    else if (id == 20) {
        //  Select Madrid
        await selectDate('Madrid', inbound, res);
    }
    else if (id == 21) {
        //  Select Milan        
        await selectDate('Milan', inbound, res);
    }
    else if (id == 22) {
        //  First date selected
        await selectTime(inbound, res);
    }
    else if (id == 23) {
        //  Second date selected
        await selectTime(inbound, res);
    }
    else if (id == 24) {
        //  Third date selected
        await selectTime(inbound, res);
    }
    else if (id == 25) {
        //  Selected Morning
        await finalMessage(inbound, res);
    }
    else if (id == 26) {
        //  Selected Mid-Day
        await finalMessage(inbound, res);
    }
    else if (id == 27) {
        //  Selected Afternoon
        await finalMessage(inbound, res);
    }
    else if (id == 28) {
        //  Men - See Blazers        
        await womenItemSelected(inbound, res);
    }
    else if (id == 29) {
        //  Men - See Cashmere
        await womenItemSelected(inbound, res);
    }
    else if (id == 30) {
        //  Men - See Jeans
        await womenItemSelected(inbound, res);
    }
    else if (id == 31) {
        //  Men - See Boots
        await womenItemSelected(inbound, res);
    }
    else if (id == 32) {
        //  Men - See Trainers
        await womenItemSelected(inbound, res);
    }
    else if (id == 33) {
        //  Men - See Shoes
        await womenItemSelected(inbound, res);
    }
    else if (id == 34) {
        //  Men - See Bags
    }
    else if (id == 35) {
        //  Men - See Belts
        await womenItemSelected(inbound, res);
    }
    else if (id == 36) {
        //  Men - See Hats
        await womenItemSelected(inbound, res);
    }
}





async function womenItemSelected(inbound, res) {
    const message = `You deserve more than an online shopping experience . Lets get you booked in with one of our private shoppers for personalized fitting experience.`;
    const buttons = [
        {
            "reply": {
                "text": "Book Now",
                "postbackData": "fashion_18",
            }
        },            
        {
            "reply": {
                "text": "Keep Looking",
                "postbackData": "fashion_1",
            }
        },            
    ]
    RcsUtils.sendRCSButtons(inbound.phone, message, buttons, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}

async function selectDate(location, inbound, res) {
    const arrayOfDates = getRandomDatesNextWeek(3);
    const message = `${location} is a great choice. Choose a convenient time from our available store slots`;
    const buttons = [
        {
            "reply": {
                "text": arrayOfDates[0],
                "postbackData": "fashion_22",
            }
        },            
        {
            "reply": {
                "text": arrayOfDates[1],
                "postbackData": "fashion_23",
            }
        },            
        {
            "reply": {
                "text": arrayOfDates[2],
                "postbackData": "fashion_24",
            }
        },            
    ]
    RcsUtils.sendRCSButtons(inbound.phone, message, buttons, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}

async function selectTime(inbound, res) {
    const message = `Please choose one of the available time slots`;
    const buttons = [
        {
            "reply": {
                "text": "Morning",
                "postbackData": "fashion_25",
            }
        },            
        {
            "reply": {
                "text": "Mid-Day",
                "postbackData": "fashion_26",
            }
        },            
        {
            "reply": {
                "text": "Afternoon",
                "postbackData": "fashion_27",
            }
        },            
    ]
    RcsUtils.sendRCSButtons(inbound.phone, message, buttons, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}

async function finalMessage(inbound, res) {
    const message = `Your booking is confirmed, ${inbound.name}. We look forward to seeing you at our store!`;
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}





function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomDatesNextWeek(count = 3) {
    const today = new Date();
    // Start of next week (next Monday)
    const dayOfWeek = today.getDay(); // 0=Sunday, 1=Monday, ...
    const daysUntilNextMonday = (8 - dayOfWeek) % 7 || 7;
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilNextMonday);
    const options = { weekday: 'long', day: 'numeric' };
    const randomDates = [];
    while (randomDates.length < count) {
        // Random offset: 0–6 days from next Monday
        const offset = Math.floor(Math.random() * 7);
        const d = new Date(nextMonday);
        d.setDate(nextMonday.getDate() + offset);
        const formatted = d.toLocaleDateString('en-GB', options);
        // Ensure no duplicates
        if (!randomDates.includes(formatted)) {
            randomDates.push(formatted);
        }
    }
    return randomDates;
}


module.exports = {
    action,
    fashion,
}