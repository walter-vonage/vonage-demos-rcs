
const STATUS = [];

async function respondTo(inbound, res) {

    const {
        to,
        phone,
        message_type,
        text,
        imageUrl,
        location,
        replyId,
        replyTitle,
        name
    } = inbound

    const textLowercase = text?.toLowerCase();
    const userStatus = getStatus(phone);
    // Backery: Check if replyId or textLowercase matches "bakery_X"
    const matchBakery = (replyId || textLowercase || '').match(/^bakery_(\d+)$/);
    // Fashion: Check if replyId or textLowercase matches "fashion_X"
    const matchFashion = (replyId || textLowercase || '').match(/^fashion_(\d+)$/);
    // Dreamforce: Check if replyId or textLowercase matches "dreamforce_X"
    const matchDreamforce = (replyId || textLowercase || '').match(/^dreamforce_(\d+)$/);

    if (inbound)            console.log('inbound', inbound)
    if (textLowercase)      console.log('textLowercase', textLowercase)
    if (userStatus)         console.log('userStatus', userStatus)
    if (matchBakery)        console.log('matchBakery', matchBakery)
    if (matchDreamforce)    console.log('matchDreamforce', matchDreamforce)

    if (userStatus && userStatus != '') {

        if (userStatus == 'ai') {
            //  User asked a question to the AI
            setStatus(phone, '')
            //  AI bot
            const bot = require('../bots/ai/index')
            await bot.respondQuestion(inbound, res)
        }

        else if (userStatus == 'ai2') {
            //  User asked a question to the AI2
            setStatus(phone, '')
            //  AI bot
            const bot = require('../bots/ai2/index')
            await bot.respondQuestion(inbound, res)
        }


    } else {

        //  HELP
        if (textLowercase == 'help') {
            const bot = require('../bots/help')
            await bot.action(inbound, res)
        }

        //  STOP
        else if (textLowercase == 'stop') {
            const bot = require('../bots/stop')
            await bot.action(inbound, res)
        }

        //  INTRO
        else if (textLowercase == 'intro' || textLowercase == 'hello' || textLowercase == 'start') {
            const bot = require('../bots/intro')
            await bot.action(inbound, res)
        }


        //  ROMAIN BOTS
        else if (textLowercase == 'cspmain' || textLowercase == 'cspstart' || replyId == 'cspmain' || replyId == 'cspstart') {
            //  Main
            const bot = require('../bots/romain')
            await bot.action(inbound, res)
        }
        else if (replyId == 'csplowdata' || textLowercase == 'csplowdata') {
            //  Low Data
            const bot = require('../bots/romain/low_data')
            await bot.action(inbound, res)
        }
        else if (replyId == 'csplowdata_1' || textLowercase == 'csplowdata_1') {
            //  Low Data - Option 1
            const bot = require('../bots/romain/low_data')
            await bot.option1(inbound, res)
        }
        else if (replyId == 'csplowdata_2' || textLowercase == 'csplowdata_2') {
            //  Low Data - Option 2
            const bot = require('../bots/romain/low_data')
            await bot.option2(inbound, res)
        }
        else if (replyId == 'csplowdata_3' || textLowercase == 'csplowdata_3') {
            //  Low Data - Option 3
            const bot = require('../bots/romain/low_data')
            await bot.option3(inbound, res)
        }
        else if (replyId == 'csplowdata_4' || textLowercase == 'csplowdata_4') {
            //  Low Data - Option 4
            const bot = require('../bots/romain/low_data')
            await bot.option4(inbound, res)
        }
        else if (replyId == 'up_plus' || textLowercase == 'up_plus') {
            //  Low Data - Upgrade to Plus
            const bot = require('../bots/romain/low_data')
            await bot.upgradedToPlus(inbound, res)
        }
        else if (replyId == 'up_premium' || textLowercase == 'up_premium') {
            //  Low Data - Upgrade to Premium
            const bot = require('../bots/romain/low_data')
            await bot.upgradedToPremium(inbound, res)
        }
        else if (replyId == 'up_unlimited' || textLowercase == 'up_unlimited') {
            //  Low Data - Upgrade to unlimited
            const bot = require('../bots/romain/low_data')
            await bot.upgradedToUnlimited(inbound, res)
        }
        else if (replyId == 'csproaming' || textLowercase == 'csproaming') {
            //  Roaming
            const bot = require('../bots/romain/roaming')
            await bot.action(inbound, res)
        }
        else if (replyId == 'roaming_1' || textLowercase == 'roaming_1') {
            //  Roaming - Package 1
            const bot = require('../bots/romain/roaming')
            await bot.roaming(1, inbound, res)
        }
        else if (replyId == 'roaming_2' || textLowercase == 'roaming_2') {
            //  Roaming - Package 2
            const bot = require('../bots/romain/roaming')
            await bot.roaming(2, inbound, res)
        }
        else if (replyId == 'roaming_3' || textLowercase == 'roaming_3') {
            //  Roaming - Package 3
            const bot = require('../bots/romain/roaming')
            await bot.roaming(3, inbound, res)
        }
        else if (replyId == 'roaming_4' || textLowercase == 'roaming_4') {
            //  Roaming - Package 4
            const bot = require('../bots/romain/roaming')
            await bot.roaming(4, inbound, res)
        }
        else if (replyId == 'csprenew' || textLowercase == 'csprenew') {
            //  Subscription Renew 
            const bot = require('../bots/romain/subscription_renew')
            await bot.action(inbound, res)
        }
        else if (replyId == 'csprenew_1' || textLowercase == 'csprenew_1') {
            //  Subscription Renew - Option 1
            const bot = require('../bots/romain/subscription_renew')
            await bot.renew(1, inbound, res)
        }
        else if (replyId == 'csprenew_2' || textLowercase == 'csprenew_2') {
            //  Subscription Renew - Option 2
            const bot = require('../bots/romain/subscription_renew')
            await bot.renew(2, inbound, res)
        }
        else if (replyId == 'csprenew_3' || textLowercase == 'csprenew_3') {
            //  Subscription Renew - Option 3
            const bot = require('../bots/romain/subscription_renew')
            await bot.renew(3, inbound, res)
        }
        else if (replyId == 'csprenew_4' || textLowercase == 'csprenew_4') {
            //  Subscription Renew - Option 4
            const bot = require('../bots/romain/subscription_renew')
            await bot.renew(4, inbound, res)
        }
        else if (replyId == 'csplatepay' || textLowercase == 'csplatepay') {
            //  Late Payment
            const bot = require('../bots/romain/late_payment')
            await bot.action(inbound, res)
        }
        else if (replyId == 'csplatepay_1' || textLowercase == 'csplatepay_1') {
            //  Late Payment - Option 1
            const bot = require('../bots/romain/late_payment')
            await bot.pay(1, inbound, res)
        }
        else if (replyId == 'csplatepay_2' || textLowercase == 'csplatepay_2') {
            //  Late Payment - Option 2
            const bot = require('../bots/romain/late_payment')
            await bot.pay(2, inbound, res)
        }
        else if (replyId == 'csplatepay_3' || textLowercase == 'csplatepay_3') {
            //  Late Payment - Option 3
            const bot = require('../bots/romain/late_payment')
            await bot.pay(3, inbound, res)
        }
        else if (replyId == 'csplatepay_4' || textLowercase == 'csplatepay_4') {
            //  Late Payment - Option 4
            const bot = require('../bots/romain/late_payment')
            await bot.pay(4, inbound, res)
        }
        else if (replyId == 'csplatepay_5' || textLowercase == 'csplatepay_5') {
            //  Late Payment - Confirmation pay 1
            const bot = require('../bots/romain/late_payment')
            await bot.confirmation(1, inbound, res)
        }
        else if (replyId == 'csplatepay_6' || textLowercase == 'csplatepay_6') {
            //  Late Payment - Confirmation pay 2
            const bot = require('../bots/romain/late_payment')
            await bot.confirmation(2, inbound, res)
        }
        else if (replyId == 'csplatepay_7' || textLowercase == 'csplatepay_7') {
            //  Late Payment - Confirmation pay 3
            const bot = require('../bots/romain/late_payment')
            await bot.confirmation(3, inbound, res)
        }
        else if (replyId == 'csplatepay_8' || textLowercase == 'csplatepay_8') {
            //  Late Payment - Confirmation pay - Ask for Support
            const bot = require('../bots/romain/late_payment')
            await bot.confirmation(4, inbound, res)
        }
        else if (replyId == 'cspphon' || textLowercase == 'cspphon') {
            //  Renewal Phone (called from ai2)
            const bot = require('../bots/romain/renewal_phone')
            await bot.action(inbound, res)
        }
        else if (replyId == 'csppayment' || textLowercase == 'csppayment') {
            //  Payment for a plan
            const bot = require('../bots/romain/payment')
            await bot.action(inbound, res)
        }
        else if (replyId == 'csppayment_1' || textLowercase == 'csppayment_1') {
            //  Payment for a plan - Option 1
            const bot = require('../bots/romain/payment')
            await bot.pay(inbound, res)
        }

        //  BAKERY
        else if (replyId == 'bakery' || textLowercase == 'bakery') {
            const bot = require('../bots/bakery/index')
            await bot.action(inbound, res)
        }
        else if (matchBakery) {
            //  Any of the bakery options from 1 to 18
            const bot = require('../bots/bakery/index');
            // Extract the number after bakery_
            const option = parseInt(matchBakery[1], 10); 
            await bot.bakeryOption(option, inbound, res);
        }


        //  FASHION
        else if (replyId == 'fashion' || textLowercase == 'fashion') {
            const bot = require('../bots/fashion/index')
            await bot.action(inbound, res)
        }
        else if (matchFashion) {
            //  Any of the fashion options
            const bot = require('../bots/fashion/index')
            // Extract the number after fashion_
            const option = parseInt(matchFashion[1], 10); 
            await bot.fashion(option, inbound, res);
        }


        //  AI bot
        else if (replyId == 'ai' || textLowercase == 'ai') {
            setStatus(phone, 'ai')
            const bot = require('../bots/ai')
            await bot.action(inbound, res)
        }


        //  WHAT IS RCS
        else if (replyId == 'rcsinfo' || textLowercase == 'rcsinfo') {
            //  RCS Info
            const bot = require('../bots/whatsrcs')
            await bot.action(inbound, res)
        }
        else if (replyId == 'rcsinfo_1' || textLowercase == 'rcsinfo_1') {
            // Execute POST 
            const bot = require('../bots/whatsrcs/index')
            await bot.executeForRCSUseCases(inbound, res)
        }
        else if (replyId == 'rcsinfo_3' || textLowercase == 'rcsinfo_3') {
            //  Sample RCS messages
            const bot = require('../bots/sample_rcs_messages')
            await bot.action(inbound, res)
        }
        else if (replyId == 'rcsinfo_4' || textLowercase == 'rcsinfo_4') {
            //  Benefts
            const bot = require('../bots/whatsrcs')
            await bot.showBenefits(inbound, res)
        }


        //  SAMPLE RCS MESSAGES
        else if (replyId == 'samplercs' || replyId == 'menu' || textLowercase == 'samplercs' || textLowercase == 'menu') {
            const bot = require('../bots/sample_rcs_messages')
            await bot.action(inbound, res)
        }
        else if (replyId == 'sample_rcs_1' || textLowercase == 'sample_rcs_1') {
            //  Calendar entry
            const bot = require('../bots/sample_rcs_messages')
            await bot.sample(1, inbound, res)
        }
        else if (replyId == 'sample_rcs_2' || textLowercase == 'sample_rcs_2') {
            //  Location request
            const bot = require('../bots/sample_rcs_messages')
            await bot.sample(2, inbound, res)
        }
        else if (replyId == 'sample_rcs_3' || textLowercase == 'sample_rcs_3') {
            //  Video
            const bot = require('../bots/sample_rcs_messages')
            await bot.sample(3, inbound, res)
        }
        else if (replyId == 'sample_rcs_4' || textLowercase == 'sample_rcs_4') {
            //  PDF
            const bot = require('../bots/sample_rcs_messages')
            await bot.sample(4, inbound, res)
        }
        else if (replyId == 'sample_rcs_5' || textLowercase == 'sample_rcs_5') {
            //  Richcards
            const bot = require('../bots/sample_rcs_messages')
            await bot.sample(5, inbound, res)
        }
        

        //  ai2
        else if (replyId == 'ai2' || textLowercase == 'ai2') {
            setStatus(phone, 'ai2')
            const bot = require('../bots/ai2/index')
            await bot.action(inbound, res);
        }

        //  DREAMFORCE
        else if (replyId == 'dreamforce' || textLowercase == 'dreamforce') {
            const bot = require('../bots/dreamforce/index')
            await bot.showIntro(inbound, res);
        }
        else if (matchDreamforce) {
            //  Any of the fashion options
            const bot = require('../bots/dreamforce/index')
            // Extract the number after dreamforce_
            const option = parseInt(matchDreamforce[1], 10); 
            await bot.dreamforce(option, inbound, res);
        }
        else if (replyId && replyId.indexOf('|') > -1) {
            //  A DATE AND TIME TO BOOK WAS SELECTED
            const bot = require('../bots/dreamforce/index')
            await bot.dateAndTimeSelected(inbound, res)
        }
        
    }
}


//
//  COMMON FUNCTIONS
//

function setStatus(phone, status) {
    const item = STATUS.find((i) => i.phone == phone);
    if (!item) {
        STATUS.push({
            phone, status
        })
    } else {
        item.status = status
    }
    console.log('set status', STATUS)
}

function getStatus(phone) {
    console.log('get status for ' + phone, STATUS)
    const item = STATUS.find((i) => i.phone == phone);
    if (item) {
        return item.status;
    } else {
        return null
    }
}

module.exports = {
    respondTo,
}




