const express = require('express');
const router = express.Router();

const rootModule = require('../../components/root');

const Exams = rootModule.exams;

router.post("/all",async (req, res) => {
    res.send(await Exams.getExams());
});

router.post("/get",async (req, res) => {
    let Exam = await Exams.getExamById(req.body.id);

    if ( Exam.length === 0 ) {
        res.status(404).send({});
    }
    else {
        res.send(Exam[0]);
    }
});

router.post("/add",async (req, res) => {
    await Exams.insertNewExam(req.body);

    res.send({});
});

router.post("/edit",async (req, res) => {
    await Exams.updateExamData(req.body);

    res.send({});
});

router.post("/remove",async (req, res) => {
    await Exams.removeExam(req.body);

    res.send({});
});


module.exports = router;