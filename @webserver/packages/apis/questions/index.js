const express = require('express');
const router = express.Router();

const rootModule = require('../../components/root');

const Questions = rootModule.questions;

router.post("/all",async (req, res) => {
    res.send(await Questions.getQuestions());
});

router.post("/get",async (req, res) => {
    let Question = await Questions.getQuestionByID(req.body.id);

    if ( Question.length === 0 ) {
        res.status(404).send({});
    }
    else {
        res.send(Question[0]);
    }
});

router.post("/add",async (req, res) => {
    await Questions.insertQuestion(req.body);

    res.send({});
});

router.post("/edit",async (req, res) => {
    await Questions.updateQuestion(req.body);

    res.send({});
});

router.post("/remove",async (req, res) => {
    await Questions.removeQuestion(req.body);

    res.send({});
});


module.exports = router;