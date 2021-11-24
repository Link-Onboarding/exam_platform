const MySQL = require("../library/MySQL/reducers");

const ADD_NEW_QUESTION = "ADD_NEW_QUESTION";
MySQL.addReducer(ADD_NEW_QUESTION, `INSERT INTO questions
(class_id, content, owner, slots) 
VALUES (@class_id, @content, @owner, @slots)`);

const GET_QUESTIONS = "GET_QUESTIONS";
MySQL.addReducer(GET_QUESTIONS, "SELECT * FROM questions");

const GET_QUESTION_BY_ID = "GET_QUESTION_BY_ID";
MySQL.addReducer(GET_QUESTION_BY_ID, "SELECT * FROM questions WHERE id = @id");

const UPDATE_QUESTION_BY_ID = "UPDATE_QUESTION_BY_ID";
MySQL.addReducer(UPDATE_QUESTION_BY_ID, "UPDATE questions SET class_id = @class_id, content = @content, slots = @slots WHERE id = @id");

const REMOVE_QUESTION = "REMOVE_QUESTION";
MySQL.addReducer(REMOVE_QUESTION, "DELETE FROM questions WHERE id = @id");

exports.insertQuestion = async payload => {
    return await MySQL.executeReducer(ADD_NEW_QUESTION, {
        class_id: payload.class_id,
        content: payload.content,
        owner: payload.owner,
        slots: payload.slots
    });
};

exports.getQuestions = async () => {
    return await MySQL.executeReducer(GET_QUESTIONS, {});
};

exports.getQuestionByID = async payload => {
    return await MySQL.executeReducer(UPDATE_QUESTION_BY_ID, {id: payload.id});
};

exports.updateQuestion = async payload => {
    return await MySQL.executeReducer(UPDATE_QUESTION_BY_ID, {
        class_id: payload.class_id,
        content: payload.content,
        slots: payload.slots
    });
};

exports.removeQuestion = async payload => {
    return await MySQL.executeReducer(REMOVE_QUESTION, {id: payload.id});
};
