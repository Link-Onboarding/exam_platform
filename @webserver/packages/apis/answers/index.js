const express = require('express');
const router = express.Router();

const rootModule = require('../../components/root');

const Answers = rootModule.answers;

router.post("/get",async (req, res) => {
    let Answer = await Answers.getAnswerById(req.body.id);

    if ( Answer.length === 0 ) {
        res.status(404).send({});
    }
    else {
        res.send(Answer[0]);
    }
});

router.post("/add",async (req, res) => {
    await Answers.insertAnswer(req.body);

    res.send({});
});

router.post("/edit",async (req, res) => {
    await Answers.updateAnswer(req.body);

    res.send({});
});

router.post("/remove",async (req, res) => {
    await Answers.removeAnswer(req.body);

    res.send({});
});


module.exports = router;