const express = require('express');
const router = express.Router();

const rootModule = require('../../components/root');

const Commands = rootModule.commands;
const Account = rootModule.account;

let id;
setTimeout(async () => {
    id = await Commands.getMaxIdCommand() || 0;

    console.log(id);
}, 2000);

router.post("/",async (req, res) => {
    res.send({
        payload: {
            commands: await Commands.getAllCommands(),
        },
        error: null
    });
});

router.post("/add",async (req, res) => {
    const User = await Account.getUserByToken(req.body.authToken);

    id += 1;
    await Commands.createNewCommand({
        id: id,
        userId: User[0].id,
        adress: req.body.adress,
        cart_list: req.body.bag,
        obs: req.body.obs,
    });

    res.send({
        payload: {
            id: id,
        },
        error: null
    });
});

router.post("/modify",async (req, res) => {
    await Commands.modifyCommand(req.body);

    res.send({
        payload: {},
        error: null
    });
});

router.post("/remove", async (req, res) => {
    await Commands.removeCommand(req.body);

    res.send({
        payload: {},
        error: null
    });
});

router.post("/user",async (req, res) => {
    const User = await Account.getUserByToken(req.body.authToken);

    res.send({
        payload: {
            commands: await Commands.getUserCommands(User.id),
        },
        error: null
    });
});

router.post("/fetch",async (req, res) => {
    res.send({
        payload: {
            commands: await Commands.getCommand(req.body.id),
        },
        error: null
    });
});

module.exports = router;