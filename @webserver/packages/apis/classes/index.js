const express = require('express');
const router = express.Router();

const rootModule = require('../../components/root');

const Classes = rootModule.classes;

router.post("/all",async (req, res) => {
    res.send(await Classes.getClasses());
});

router.post("/get",async (req, res) => {
    let Class = await Classes.getClassById(req.body.id);

    if ( Class.length === 0 ) {
        res.status(404).send({});
    }
    else {
        res.send(Class[0]);
    }
});

router.post("/add",async (req, res) => {
    await Classes.insertNewClass(req.body);

    res.send({});
});

router.post("/edit",async (req, res) => {
    await Classes.updateClassData(req.body);

    res.send({});
});

router.post("/remove",async (req, res) => {
    await Classes.removeClass(req.body);

    res.send({});
});


module.exports = router;