const MySQL = require("../library/MySQL/reducers");

const INSERT_NEW_CLASS = "INSERT_NEW_CLASS";
MySQL.addReducer(INSERT_NEW_CLASS, `INSERT INTO classes
    (name) 
    VALUES (@name)
`);

const GET_CLASSES = "GET_CLASSES";
MySQL.addReducer(GET_CLASSES, "SELECT * FROM classes");

const GET_CLASS_BY_ID = "GET_CLASS_BY_ID";
MySQL.addReducer(GET_CLASS_BY_ID, "SELECT * FROM classes WHERE id = @id");

const UPDATE_CLASS_DATA = "UPDATE_CLASS_DATA";
MySQL.addReducer(UPDATE_CLASS_DATA, "UPDATE classes SET name = @name WHERE id = @id");

const LINK_CLASS_PROF = "LINK_CLASS_PROF";
MySQL.addReducer(LINK_CLASS_PROF, "INSERT INTO lnk_class_prof (class_id, prof_id) VALUES (@class_id, @prof_id)");

const LINK_CLASS_STRUCT = "LINK_CLASS_STRUCT";
MySQL.addReducer(LINK_CLASS_STRUCT, "INSERT INTO lnk_class_struct (class_id, struct_id) VALUES (@class_id, @struct_id)");

const REMOVE_CLASS = "REMOVE_CLASS";
MySQL.addReducer(REMOVE_CLASS, "DELETE FROM classes WHERE id = @id");

exports.insertNewClass = async payload => {
    return await MySQL.executeReducer(INSERT_NEW_CLASS, {name: payload.name});
};

exports.getClasses = async () => {
    return await MySQL.executeReducer(GET_CLASSES, {});
};

exports.getClassById = async payload => {
    return await MySQL.executeReducer(GET_CLASS_BY_ID, {id: payload});
};

exports.updateClassData = async payload => {
    return await MySQL.executeReducer(UPDATE_CLASS_DATA, {name: payload.name});
};

exports.linkClassToProf = async payload => {
    return await MySQL.executeReducer(LINK_CLASS_PROF, {class_id: payload.class_id, prof_id: payload.prof_id});
};

exports.linkClassToStruct = async payload => {
    return await MySQL.executeReducer(LINK_CLASS_STRUCT, {class_id: payload.class_id, struct_id: payload.struct_id});
};

exports.removeClass = async payload => {
    return await MySQL.executeReducer(REMOVE_CLASS, {id: payload.id});
};
