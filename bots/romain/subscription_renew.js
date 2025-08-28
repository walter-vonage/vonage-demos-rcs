const RcsUtils = require('../../work/rcs_utils');
const WEBHOOK = null;
const { format } = require('date-fns');

async function action(inbound, res) {
    const name = inbound.name;
    const formatted = getFutureDate();
    const message = `Hi ${name} your subscription is about to expire on ${formatted}.

Renew now to keep enjoying uninterrupted services!

Choose a plan below and check out our latest phone bundles as part of the renewal:`
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        console.log('Intro sent')
    })

    await sleep(2000);

    const cards = [
        {
            "title": "Standard Plan + Phone",
            "description": "$40/month - Includes 10GB Data",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0OnGnP8LDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Select",
                        "postbackData": "csprenew_1",
                    }
                },
            ],
        },
        {
            "title": "Premium Plan + Phone",
            "description": "$60/month - Includes 20GB Data",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0JnwsswIDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Select",
                        "postbackData": "csprenew_2",
                    }
                },
            ],
        },
        {
            "title": "Unlimited Plan + Phone",
            "description": "$90/month - Includes Unlimited Data",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Nm87-sJDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Select",
                        "postbackData": "csprenew_3",
                    }
                },
            ],
        },
        {
            "title": "Skip Renewal for Now",
            "media": {
                "height": "MEDIUM",
                "contentInfo": {
                    "fileUrl": "https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0LGX2_0JDA",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Select",
                        "postbackData": "csprenew_4",
                    }
                },
            ],
        },
    ]
    RcsUtils.sendRCSCarousel(inbound.phone, cards, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}


async function renew(id, inbound, res) {
    const name = inbound.name;
    let message = `Great choice, ${name}
    
`;
    if (id == 1) {
        message += `
You've selected the Standard Plan at $40/month with 10GB data per month.

This plan comes with

💬  200 mins Talktime & 200 SMS
💵  $150 Loyalty Voucher
🔒  McAfee Security (not applicable to CIS customers)
🌐  Worldwide Roaming 1GB
🎵 Free 1 mth Spotify
🎥  6 mths of Disney+ Premium


Now, it's time to select your brand-new phone 📱`
    }
    if (id == 2) {
        message += `
You've selected the Premium Plan at $60/month with 20GB data per month.

This plan comes with

💬 600 mins Talktime & 600 SMS
💵 $150 Loyalty Voucher
🔒 McAfee Security (not applicable to CIS customers)
🌐 Worldwide Roaming 1GB
🎵 Free 1 mth Spotify
🎥 6 mths of Disney+ Premium


Now, it's time to select your brand-new phone 📱`
    }
    if (id == 3) {
        message += `
You've selected the Unlimited Plan at $90/month with unlimited data.

This plan comes with

💬 Unlimited Talktime & SMS
💵 $150 Loyalty Voucher
🔒 McAfee Security (not applicable to CIS customers)
🌐 Worldwide Roaming 1GB
🎵 Free 1 mth Spotify
🎥 6 mths of Disney+ Premium

Now, it's time to select your brand-new phone 📱`
    }
    if (id == 4) {
        const formatted = getFutureDate();
        message = `No worries, ${name}

You’ve chosen to skip renewal for now. 
If you change your mind, just let me know. 

Your current plan will expire on ${formatted}`
    }

    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function getFutureDate() {
    // Get today's date
    const today = new Date();

    // Add 10 days
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 10);

    // Format as: Tuesday, March 5
    const formatted = format(futureDate, 'EEEE, MMMM d');
    return formatted;
}


module.exports = {
    action,
    renew,
}