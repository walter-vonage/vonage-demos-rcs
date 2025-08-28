function action(app) {
    /**
     * Check system health
     */
    app.get('/_/health', async (req, res) => {
        res.sendStatus(200);
    });

    /**
     * VCR calls this to show metrics related stuff
     */
    app.get('/_/metrics', async (req, res) => {
        res.sendStatus(200);
    });

}

module.exports = {
    action
}