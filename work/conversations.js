const CONVERSATIONS = [];

function numberHasData(phone) {
    const index = CONVERSATIONS.findIndex((i) => i.phone == phone);
    return (index == -1) ? false : true
}

function addData(phone, key, value) {
    const convo = CONVERSATIONS.find(i => i.phone === phone);
    if (convo) {
        convo.data.push({ key, value });
    } else {
        CONVERSATIONS.push({
            phone,
            data: [{ key, value }]
        });
    }
}

function removeAllData(phone) {
    const index = CONVERSATIONS.findIndex(i => i.phone === phone);
    if (index > -1) CONVERSATIONS.splice(index, 1);
}

function getData(phone, key) {
    const convo = CONVERSATIONS.find(i => i.phone === phone);
    return convo?.data.find(i => i.key === key) || null;
}

function getAllData(phone) {
    const convo = CONVERSATIONS.find(i => i.phone === phone);
    return convo?.data || [];
}


module.exports = {
    numberHasData,
    addData,
    removeAllData,
    getData,
    getAllData,
}
