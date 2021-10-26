const express = require('express');
const router = express.Router();

const rootModule = require('../../components/root');

const Account = rootModule.account;

router.post("/",async (req, res) => {
    let User = await Account.getUserById(req.body.id);

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

router.post("/register",async (req, res) => {
    let User = await Account.insertNewUser(req.body);

    delete User[0].password;

    res.send(User[0]);
});

router.post("/login", async (req, res) => {
    const User = await Account.getUserByUsername(req.body.username);

    console.log(User)

    if (User.length === 0) {
        res.status(404).send({
          message: "Niciun user gasit!"
        });
    }
    if (User[0].password === req.body.password) {
        delete User[0].password;

        res.send(User[0]);
    }
    else {
        res.status(404).send({
            message: "Credentiale gresite!"
        });
    }
});

router.post("/edit",async (req, res) => {
    const User = await Account.getUserById(req.body.id);

    if (User.length === 0) {
        res.status(404).send({
          message: "Niciun user gasit!"
        });
    }
    else {
        await Account.editUserData(req.body);

        res.send({});
    }
});

router.post("/password",async (req, res) => {
    const User = await Account.getUserById(req.body.id);

    if (User.length === 0) {
        res.status(404).send({
          message: "Niciun user gasit!"
        });
    }
    else {
        await Account.setUserPassword(req.body);

        res.send({});
    }
});


module.exports = router;