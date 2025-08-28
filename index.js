const Config = require('./config')
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Utils = require('./work/utils');
const Flow = require('./work/flow');
const app = express();
const port = process.env.VCR_PORT || 3000;
const publicPath = path.join(__dirname, 'public');
const session = require('express-session');
const DB = require('./work/db');

const miscRoutes = require('./work/misc_routes')
const vonageWork = require('./work/vonage_routes')
const calendarRoutes = require('./work/calendar_routes')
const vcrRoutes = require('./work/vcr_routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Setup EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Serve static files (optional)
app.use(express.static(publicPath));
// Sessions
app.use(session({
    secret: 'vonage-super-secret',
    resave: false,
    saveUninitialized: true,
}));


vonageWork.action(app);
miscRoutes.action(app);
calendarRoutes.action(app);
vcrRoutes.action(app);

/**
 * WEBHOOK
 */
app.post('/webhook', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(200).json({
                success: false,
                message: 'No body'
            })
        }

        //  Parse the inbound message and be ready for anything
        const inbound = Utils.parseInbound(req.body);

        if (!inbound) {
            return res.status(200).json({
                success: false,
                message: 'Invalid inbound'
            })
        }

        if (inbound.to != Config.data.FROM) {
            return res.status(200).json({
                success: false,
                message: 'This RCS is not targeted to this Sender ID: ' + Config.data.FROM
            })
        }

        const name = (await DB.getNameByPhone(inbound.phone)) || 'Guest';
        inbound.name = name;

        await Flow.respondTo(inbound, res)

    } catch (ex) {
        console.log(ex.message)
        res.status(200).json({
            success: false,
            message: ex.message
        })
    }
})

/**
 * Listen
 */
app.listen(port, () => {
    console.log(`Server running on PORT ${port}`);
    console.log('This url: ' + Config.data.SERVER);
});
