const MySQL = require("../library/MySQL/reducers");

require("dotenv").config();

const INSERT_NEW_EXAM = "INSERT_NEW_EXAM";
MySQL.addReducer(INSERT_NEW_EXAM, `INSERT INTO exams
    (class_id, slots, owner, start_date, finish_date) 
    VALUES (@class_id, @slots, @owner, @start_date, @finish_date)
`);

const GET_EXAMS = "GET_EXAMS";
MySQL.addReducer(GET_EXAMS, "SELECT * FROM exams");

const GET_EXAM_BY_ID = "GET_EXAM_BY_ID";
MySQL.addReducer(GET_EXAM_BY_ID, "SELECT * FROM exams WHERE id = @id");

const UPDATE_EXAM_DATA = "UPDATE_EXAM_DATA";
MySQL.addReducer(UPDATE_EXAM_DATA, "UPDATE exams SET start_date = @start_date, finish_date = @finish_date WHERE id = @id");

const REMOVE_EXAM = "REMOVE_EXAM";
MySQL.addReducer(REMOVE_EXAM, "DELETE FROM exams WHERE id = @id");

exports.insertNewExam = async payload => {
    return await MySQL.executeReducer(INSERT_NEW_EXAM, {
        class_id: payload.class_id,
        slots: payload.slots,
        owner: payload.owner,
        start_date: payload.start_date,
        finish_date: payload.finish_date
    });
};

exports.getExams = async () => {
    return await MySQL.executeReducer(GET_EXAMS, {});
};

exports.getExamById = async payload => {
    return await MySQL.executeReducer(GET_EXAM_BY_ID, {id: payload});
};

exports.updateExamData = async payload => {
    return await MySQL.executeReducer(UPDATE_EXAM_DATA, {
        id: payload.id,
        start_date: payload.start_date,
        finish_date: payload.finish_date
    });
};

exports.removeExam = async payload => {
    return await MySQL.executeReducer(SET_USER_PASSWORD, {id: payload.id, password: payload.password});
};
