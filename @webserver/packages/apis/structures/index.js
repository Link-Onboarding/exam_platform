const express = require('express');
const router = express.Router();

const rootModule = require('../../components/root');

const Structures = rootModule.structures;

router.post("/all",async (req, res) => {
    res.send(await Structures.getStructures());
});

router.post("/get",async (req, res) => {
    let User = await Structures.getStructure(req.body.id);

    if ( User.length === 0 ) {
        res.status(404).send({
          message: "Niciun user gasit!"
        });
    }
    else {
        delete User[0].password;
        
        res.send(User[0]);
    }
});

router.post("/add",async (req, res) => {
    await Structures.insertStructure(req.body);

    res.send({});
});

router.post("/edit",async (req, res) => {
    await Structures.updateStructure(req.body);

    res.send({});
});

router.post("/remove",async (req, res) => {
    await Structures.removeStructure(req.body);

    res.send({});
});


module.exports = router;