const express = require('express');
const router = express.Router();

const rootModule = require('../../components/root');
const Errors = require('../../library/Errors/index');

const Account = rootModule.account;

const USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS';
Errors.addReducer(USER_ALREADY_EXISTS, "Acest date sunt deja folosite!");

const USER_NOT_EXISTS = 'USER_NOT_EXISTS';
Errors.addReducer(USER_NOT_EXISTS, "Acest cont nu exista!");

const WRONG_CREDENTIALS = 'WRONG_CREDENTIALS';
Errors.addReducer(WRONG_CREDENTIALS, "Credentialele folosite sunt incorecte!");

router.post("/",async (req, res) => {
    let User = await Account.getUserByToken(req.body.token);
    
    delete User[0].id;
    delete User[0].auth_token;
    delete User[0].password;
    delete User[0].confirmed;

    res.send(User[0] !== undefined || User[0] !== null || User[0] !== ''?{
        payload: User[0],
        error: false
    }:{
        payload: {},
        error: {
            message: Errors.getReducer(USER_NOT_EXISTS)
        }
    });
});

router.post("/register",async (req, res) => {
    const cUser = await Account.getUserByEmail(req.body.email);

    if (cUser[0] !== undefined || cUser[0] !== null || cUser[0] !== '') {
        res.send({
            payload: {},
            error: {
                message: Errors.getReducer(USER_ALREADY_EXISTS)
            }
        });
    }
    else {
        await Account.insertNewUser(req.body);

        const User = await Account.getUserByEmail(req.body.email);
        
        res.send({
            payload: {
                authToken: User[0].auth_token,
            },
            error: false
        });
    }
});

router.post("/login", async (req, res) => {
    const User = await Account.getUserByEmail(req.body.email);


    if (User[0] === undefined || User[0] === null || User[0] === '') {
        res.send({
            payload: {},
            error: {
                message: Errors.getReducer(USER_NOT_EXISTS)
            }
        });
    }
    if (User[0].password === req.body.password) {
        res.send({
            payload: {
                authToken: User[0].auth_token,
            },
            error: false
        });
    }
    else {
        res.send({
            payload: {},
            error: {
                message: Errors.getReducer(WRONG_CREDENTIALS)
            }
        });
    }
});

router.post("/edit",async (req, res) => {
    const User = await Account.getUserByToken(req.body.token);

    if (User[0] === undefined || User[0] === null || User[0] === '') {
        res.send({
            payload: {},
            error: {
                message: Errors.getReducer(USER_NOT_EXISTS)
            }
        });
    }
    else {
        await Account.editUserData(req.body);

        res.send({
            payload: {},
            error: false
        });
    }
});

router.post("/confirm",async (req, res) => {
    const User = await Account.getUserByToken(req.body.token);

    if (User[0] === undefined || User[0] === null || User[0] === '') {
        res.send({
            payload: {},
            error: {
                message: Errors.getReducer(USER_NOT_EXISTS)
            }
        });
    }
    else {
        await Account.confirmUserByToken(req.body.token);

        res.send({
            payload: {},
            error: false
        });
    }
});

router.post("/password",async (req, res) => {
    const User = await Account.getUserByToken(req.body.token);

    if (User[0] === undefined || User[0] === null || User[0] === '') {
        res.send({
            payload: {},
            error: {
                message: Errors.getReducer(USER_NOT_EXISTS)
            }
        });
    }
    else {
        await Account.setUserPassword(req.body);

        res.send({
            payload: {},
            error: false
        });
    }
});

router.post("/bag",async (req, res) => {
    const User = await Account.getUserByToken(req.body.token);

    if (User[0] === undefined || User[0] === null || User[0] === '') {
        res.send({
            payload: {},
            error: {
                message: Errors.getReducer(USER_NOT_EXISTS)
            }
        });
    }
    else {
        await Account.updateUserBag(req.body);

        res.send({
            payload: {},
            error: false
        });
    }
});

module.exports = router;