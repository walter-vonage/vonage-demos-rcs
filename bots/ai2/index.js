const RcsUtils = require('../../work/rcs_utils');
const WEBHOOK = null;
const axios = require('axios');

async function action(inbound, res) {
    const message = `🙋 Hi there!

I am Rob, the Vonage AI assistant.

Ask me a question, and I will do my best to help you.`
    RcsUtils.sendRCSText(inbound.phone, message, WEBHOOK, () => {
        res.status(200).json({ success: true })
    }) 
}

async function respondQuestion(inbound, res) {
    try {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://neru-ef3346a6-mwc25-mwc25.use1.runtime.vonage.cloud/ask',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                "text": inbound.text,
                "id": Date.now(),
                "agent": '67b8e2891ba8e3de972c20c9'
            })
        };
        axios.request(config).then( async (response) => {
            const data = response.data;
            RcsUtils.sendRCSText(inbound.phone, data.answer, WEBHOOK, () => {
                console.log('Response ai2 sent')
            })

            await sleep(1000);

            areYouHappy(inbound, res)

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

function areYouHappy(inbound, res) {
    const message = `If you are happy with the provided answer, click on the button below to return the phone selection.

💬 Otherwise, feel free to ask anything else.`
    const buttons = [
        {
            "reply": {
                "text": "Phone Selection",
                "postbackData": "cspphon",
            }
        },
    ]
    RcsUtils.sendRCSButtons(inbound.phone, message, buttons, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = {
    action,
    respondQuestion,
}