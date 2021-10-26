const MySQL = require("../library/MySQL/reducers");

const Token = require('njwt');

require("dotenv").config();

const INSERT_NEW_USER = "INSERT_NEW_USER";
MySQL.addReducer(INSERT_NEW_USER, `INSERT INTO users
    (username, password, first_name, last_name, auth_token, created_at, updated_at) 
    VALUES (@username, @password, @first_name, @last_name, @token, SYSDATE(), SYSDATE())
`);

const GET_USER_BY_TOKEN = "GET_USER_BY_TOKEN";
MySQL.addReducer(GET_USER_BY_TOKEN, "SELECT * FROM users WHERE auth_token = @token");

const GET_USER_BY_ID = "GET_USER_BY_ID";
MySQL.addReducer(GET_USER_BY_ID, "SELECT * FROM users WHERE id = @id");

const GET_USER_BY_USERNAME = "GET_USER_BY_USERNAME";
MySQL.addReducer(GET_USER_BY_USERNAME, "SELECT * FROM users WHERE username = @username");

const EDIT_USER_DATA = "EDIT_USER_DATA";
MySQL.addReducer(EDIT_USER_DATA, "UPDATE users SET first_name = @first_name, last_name = @last_name WHERE id = @id");

const SET_USER_PASSWORD = "SET_USER_PASSWORD";
MySQL.addReducer(SET_USER_PASSWORD, "UPDATE users SET password = @password WHERE id = @id");

exports.insertNewUser = async payload => {
    const authToken = Token.create(
        {
            iss: payload.first_name,
            sub: payload.last_name
        },
        payload.password
    ).compact();

    await MySQL.executeReducer(INSERT_NEW_USER, {
        username: payload.username,
        first_name: payload.first_name,
        last_name: payload.last_name,
        password: payload.password,
        token: authToken
    });

    return await MySQL.executeReducer(GET_USER_BY_TOKEN, {token: authToken});
};

exports.getUserById = async payload => {
    return await MySQL.executeReducer(GET_USER_BY_ID, {id: payload});
};

exports.getUserByUsername = async payload => {
    return await MySQL.executeReducer(GET_USER_BY_USERNAME, {username: payload});
};

exports.editUserData = async payload => {
    return await MySQL.executeReducer(EDIT_USER_DATA, {
        id: payload.id,
        first_name: payload.first_name,
        last_name: payload.last_name,
    });
};

exports.setUserPassword = async payload => {
    return await MySQL.executeReducer(SET_USER_PASSWORD, {id: payload.id, password: payload.password});
};
