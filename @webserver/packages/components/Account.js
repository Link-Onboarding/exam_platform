const MySQL = require("../library/MySQL/reducers");
const Crypto = require("../library/Crypto/index");
const Mailer = require("../library/Mailer/index");

const Token = require('njwt');

require("dotenv").config();

const INSERT_NEW_USER = "INSERT_NEW_USER";
MySQL.addReducer(INSERT_NEW_USER, `INSERT INTO users
    (id, email, password, first_name, last_name,  , auth_token, phone) 
    VALUES (@id, @email, @password, @first_name, @last_name, false, @token, @phone)
`);

const GET_USER_BY_EMAIL = "GET_USER_BY_EMAIL";
MySQL.addReducer(GET_USER_BY_EMAIL, "SELECT * FROM users WHERE email = @email");

const GET_USER_BY_TOKEN = "GET_USER_BY_TOKEN";
MySQL.addReducer(GET_USER_BY_TOKEN, "SELECT * FROM users WHERE auth_token = @token");

const CONFIRM_USER_STATE = "CONFIRM_USER_STATE";
MySQL.addReducer(CONFIRM_USER_STATE, "UPDATE users SET confirmed = true WHERE auth_token = @token");

const EDIT_USER_DATA = "EDIT_USER_DATA";
MySQL.addReducer(EDIT_USER_DATA, "UPDATE users SET first_name = @first_name, last_name = @last_name, email = @email, phone = @phone WHERE auth_token = @token");

const SET_USER_PASSWORD = "SET_USER_PASSWORD";
MySQL.addReducer(SET_USER_PASSWORD, "UPDATE users SET password = @password WHERE auth_token = @token");

const UPDATE_USER_BAG = "UPDATE_USER_BAG";
MySQL.addReducer(UPDATE_USER_BAG, "UPDATE users SET shopping_cart = @bag WHERE auth_token = @token");

exports.insertNewUser = async payload => {
    Mailer.send(payload.email, "VELANE | Confirmare cont!","Hello bby!");

    return await MySQL.executeReducer(INSERT_NEW_USER, {
        id: Crypto.encrypt(payload.email),
        first_name: payload.first_name,
        last_name: payload.last_name,
        password: payload.password,
        email: payload.email,
        phone: payload.phone,
        token: Token.create(
            {
                iss: process.env.TOKEN_ISS,
                sub: process.env.TOKEN_SUB
            },
            process.env.TOKEN_SECRET_KEY
        ).compact()
    });
};

exports.getUserByEmail = async payload => {
    return await MySQL.executeReducer(GET_USER_BY_EMAIL, {email: payload});
};

exports.getUserByToken = async payload => {
    return await MySQL.executeReducer(GET_USER_BY_TOKEN, {token: payload});
};

exports.confirmUserByToken = async payload => {
    return await MySQL.executeReducer(CONFIRM_USER_STATE, {token: payload});
};

exports.editUserData = async payload => {
    return await MySQL.executeReducer(EDIT_USER_DATA, {
        token: payload.token,
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        phone: payload.phone
    });
};

exports.setUserPassword = async payload => {
    return await MySQL.executeReducer(SET_USER_PASSWORD, {token: payload.token, password: payload.password});
};

exports.updateUserBag = async payload => {
    return await MySQL.executeReducer(UPDATE_USER_BAG, {token: payload.token, bag: JSON.stringify(payload.bag)});
};

