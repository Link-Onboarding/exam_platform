const express = require('express');
const router = express.Router();

const rootModule = require('../../components/root');

const Newsletter = rootModule.newsletter;

router.post("/add",async (req, res) => {
    await Newsletter.addMailToNewsletter(req.body.email);

    res.send({
        payload: {},
        error: false
    });
});

router.post("/send", async (req, res) => {
    await Newsletter.sendNewsletter(req.body);

    res.send({
        payload: {},
        error: false
    });
});

module.exports = router;