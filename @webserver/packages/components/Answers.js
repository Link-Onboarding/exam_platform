const MySQL = require("../library/MySQL/reducers");

const ADD_NEW_ANSWER = "ADD_NEW_ANSWER";
MySQL.addReducer(ADD_NEW_ANSWER, `INSERT INTO answers
(quest_id, content, correct) 
VALUES (@quest_id, @content, @correct)`);

const GET_ANSWER_BY_ID = "GET_ANSWER_BY_ID";
MySQL.addReducer(GET_ANSWER_BY_ID, "SELECT * FROM answers WHERE id = @id");

const UPDATE_ANSWER_BY_ID = "UPDATE_ANSWER_BY_ID";
MySQL.addReducer(UPDATE_ANSWER_BY_ID, "UPDATE answers SET quest_id = @quest_id, content = @content, correct = @correct WHERE id = @id");

const REMOVE_ANSWER = "REMOVE_ANSWER";
MySQL.addReducer(REMOVE_ANSWER, "DELETE FROM answers WHERE id = @id");

exports.insertAnswer = async payload => {
    return await MySQL.executeReducer(ADD_NEW_ANSWER, {
        quest_id: payload.class_id,
        content: payload.content,
        correct: payload.correct
    });
};

exports.getAnswerById = async payload => {
    return await MySQL.executeReducer(GET_ANSWER_BY_ID, {id: payload.id});
};

exports.updateAnswer = async payload => {
    return await MySQL.executeReducer(UPDATE_ANSWER_BY_ID, {
        id: payload.id,
        quest_id: payload.quest_id,
        content: payload.content,
        correct: payload.correct
    });
};

exports.removeAnswer = async payload => {
    return await MySQL.executeReducer(REMOVE_ANSWER, {id: payload.id});
};
