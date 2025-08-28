const RcsUtils = require('../../work/rcs_utils');
const WEBHOOK = null;
const axios = require('axios');

async function action(inbound, res) {
    const message = `Lets go! What type of messages would you like to see?`
    const buttons = [
        {
            "reply": {
                "text": "Calendar Entry",
                "postbackData": "sample_rcs_1",
            }
        },
        {
            "reply": {
                "text": "Location Request",
                "postbackData": "sample_rcs_2",
            }
        },
        {
            "reply": {
                "text": "Video",
                "postbackData": "sample_rcs_3",
            }
        },
        {
            "action": {
                "text": "PDF File",
                "postbackData": "sample_rcs_4",
                "openUrlAction": {
                    "url": "https://developers.google.com/static/business-communications/rcs-business-messaging/files/rbm-master-deck.pdf"
                }
            }
        },
        {
            "reply": {
                "text": "Richcards",
                "postbackData": "sample_rcs_5",
            }
        },
    ]
    RcsUtils.sendRCSButtons(inbound.phone, message, buttons, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}

async function sample(id, inbound, res) {
    if (id == 1) {
        //  Calendar entry
        RcsUtils.sendCalendarEntry(inbound.phone, `With RCS it's easy to add Calendar entries`, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    } else if (id == 2) {
        //  Location request
        RcsUtils.sendLocationShareRequest(inbound.phone, `With RCS it's easy to ask for user location`, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    } else if (id == 3) {
        //  Show a video
        const videoUrl = `https://jumper-emea.com/jump-image/ahJofmp1bXBlci0xNDc4MDYtZXVyGAsSC0p1bXBlcmltYWdlGICA0Kmlr9oIDA`;
        RcsUtils.sendRCSVideo(inbound.phone, videoUrl, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })        
    } else if (id == 5) {
        //  Show rich cards
        const bot = require('../whatsrcs/index');
        await bot.sendmeRichcards(inbound, res);
    } else {
        //  Send a message
        RcsUtils.sendRCSText(inbound.phone, `I'm sorry but this option is not valid`, WEBHOOK, () => {
            res.status(200).json({ success: true })
        })
    }
}


module.exports = {
    action,
    sample,
}