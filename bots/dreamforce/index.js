const RcsUtils = require('../../work/rcs_utils');
const WEBHOOK = null;
const Config = require('../../config');
const fs = require('fs').promises;
const path = require('path');
const DATA_DIR = path.join(__dirname, '../../', 'data');
const SLOTS_PATH = path.join(DATA_DIR, 'slots.json');
const axios = require('axios');

async function showIntro(inbound, res) {
    
    const name = inbound.name;
    const phone = inbound.phone;

    const message = `Hi, ${name}! We're really looking forward to seeing you at Dreamforce!
    
Here just some of the exhibition details from Vonage.

You can access any of the information below as you need, see you soon

#TeamVonage`

    RcsUtils.sendRCSText(phone, message, WEBHOOK, () => {
        console.log('RCS text sent')
    });

    await sleep(3000);

    sendIntroCards(inbound, res);
}

function sendIntroCards(inbound, res) {
    
    const phone = inbound.phone;

    const cards = [
        {
            "title": "Visit the Vonage Hub",
            "description": "Don't miss a thing!\nTimings of all things Vonage",
            "media": {
                "height": "TALL",
                "contentInfo": {
                    "fileUrl": Config.data.SERVER + "/agenda.jpg",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "action": {
                        "text": "Full Agenda",
                        "postbackData": "dreamforce_1",
                        "openUrlAction": {
                            "url": "https://www.vonage.com/events/dreamforce/"
                        }
                    }
                },
            ],
        },
        {
            "title": "Meet Us",
            "description": "Want to meet the Vonage team? Book a Dreamforce meeting, demo, or a meeting + demo",
            "media": {
                "height": "TALL",
                "contentInfo": {
                    "fileUrl": Config.data.SERVER + "/meet-the-team.jpeg",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "action": {
                        "text": "Schedule Time",
                        "postbackData": "dreamforce_2",
                        "openUrlAction": {
                            "url": "https://vonageatdreamforce2025.youcanbook.me/"
                        }
                    }
                },
            ],
        },
        {
            "title": "Innovative Demos",
            "description": "Discover how Salesforce + Vonage solve industry-specific needs with RCS",
            "media": {
                "height": "TALL",
                "contentInfo": {
                    "fileUrl": Config.data.SERVER + "/own-your-brand.jpg",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "reply": {
                        "text": "Try RCS",
                        "postbackData": "rcsinfo",
                    }
                },
            ],
        },
        {
            "title": "Must-Reads",
            "description": "Check out the latest Vonage resources, from thought leadership and ebooks to interactive experiences",
            "media": {
                "height": "TALL",
                "contentInfo": {
                    "fileUrl": Config.data.SERVER + "/ai-photos.jpg",
                    "forceRefresh": "false"
                }
            },
            "suggestions": [
                {
                    "action": {
                        "text": "Get the Full Story",
                        "postbackData": "ai_photos",
                        "openUrlAction": {
                            "url": "https://www.vonage.com/events/dreamforce/"
                        }
                    }
                },
            ],
        },
    ]
    RcsUtils.sendRCSCarousel(phone, cards, WEBHOOK, () => {
        res.status(200).json({ success: true })
    })
}

async function dreamforce(id, inbound, res) {
    if (id == 1) {
        //  Agenda
    } 
    else if (id == 2) {
        //  Meet the team
        await showAgendaSlots(inbound, res);
    }
}

async function showAgendaSlots(inbound, res) {
    try {
        const name = inbound.name;
        const phone = inbound.phone;

        const raw = await fs.readFile(SLOTS_PATH, 'utf-8');
        const slots = JSON.parse(raw || '[]');

        const formatter = new Intl.DateTimeFormat('en-GB', { month: 'long', day: 'numeric' });

        // Filter available + format date
        let availableSlots = slots
            .filter(slot => slot.available === true)
            .map(slot => ({
                ...slot,
                date: formatter.format(new Date(slot.date)), // "21 August"
                real_date: slot.date                          // original "2025-08-21"
            }));
        
        let message = ``

        if (!availableSlots || !Array.isArray(availableSlots) || availableSlots.length == 0) {
            //  No booking available
            message = name + `. There are no available spots for now. Please check later`;
            RcsUtils.sendRCSText(phone, message, WEBHOOK, () => {
                console.log('No Booking Slots available')
                res.status(200).json({ success: true })
            })
        } else {
            //  Send available slots
            message = name + '. These are all the available dates and times to book with us:\n';
            const buttons = []
            let index = 0;
            for (let slot of availableSlots) {
                buttons.push(                {
                    "reply": {
                        "text": slot.date + ' at ' + slot.time,
                        "postbackData": slot.real_date + "|" + slot.time,
                    }
                })
                if (index > 3) break;
                index ++
            }
            RcsUtils.sendRCSButtons(phone, message, buttons, WEBHOOK, () => {
                console.log('Available slots sent')
                res.status(200).json({ success: true })
            })
        }
        
    } catch (err) {
        console.error('Error reading slots:', err);
        res.status(500).send('Internal Server Error');
    }
}


async function dateAndTimeSelected(inbound, res) {
    try {
        const replyId = inbound.replyId;
        const  name = inbound.name;
        const phone = inbound.phone;

        const a = replyId.split('|');
        const date = a[0];
        const time = a[1];

        console.log('User wants date', date)
        console.log('User wants time', time)

        const raw = await fs.readFile(SLOTS_PATH, 'utf-8');
        const slots = JSON.parse(raw);

        for (let i=0; i < slots.length; i++) {
            if (slots[i].date == date && slots[i].time == time && slots[i].available) {
                slots[i].available = false;
                slots[i].bookedBy = { name, email: '', phone };
                await fs.writeFile(SLOTS_PATH, JSON.stringify(slots, null, 2));
                await fs.writeFile(SLOTS_PATH, JSON.stringify(slots, null, 2));
                RcsUtils.sendRCSText(phone, 'Thank you ' + name + '. We have booked this slot for you. See you soon!', WEBHOOK, () => {
                    console.log('Booking complete.')
                    res.status(200).json({ success: true })
                })
                return;
            }
        }

        RcsUtils.sendRCSText(phone, `I'm sorry ${name} but this date and time are no longer available. Try another please.`, WEBHOOK, () => {
            console.log('Date and time are not longer available.')
            res.status(200).json({ success: true })
        })

    } catch(ex) {
        console.log('dateAndTimeSelected Error', ex)
        RcsUtils.sendRCSText(phone, 'There was an error booking this slot. Please try again.', WEBHOOK, () => {
            console.log('Error occurred.')
            res.status(200).json({ success: true })
        })
    }
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = {
    showIntro,
    dreamforce,
    dateAndTimeSelected,
}