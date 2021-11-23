const MySQL = require("../library/MySQL/reducers");

const ADD_NEW_STRUCT = "ADD_NEW_STRUCT";
MySQL.addReducer(ADD_NEW_STRUCT, `INSERT INTO structures (pid, name) VALUES (@pid, @name)`);

const GET_STRUCT_BY_ID = "GET_STRUCT_BY_ID";
MySQL.addReducer(GET_STRUCT_BY_ID, "SELECT * FROM structures WHERE id = @id");

const GET_STRUCTS = "GET_STRUCTS";
MySQL.addReducer(GET_STRUCTS, "SELECT * FROM structures");

const GET_STRUCTS_OF_PARENT = "GET_STRUCTS_OF_PARENT";
MySQL.addReducer(GET_STRUCTS_OF_PARENT, "SELECT * FROM structures WHERE pid = @pid");

const UPDATE_STRUCT_BY_ID = "UPDATE_STRUCT_BY_ID";
MySQL.addReducer(UPDATE_STRUCT_BY_ID, "UPDATE structures SET name = @name WHERE id = @id");

const REMOVE_STRUCT = "REMOVE_STRUCT";
MySQL.addReducer(REMOVE_STRUCT, "DELETE FROM structures WHERE id = @id");

exports.insertStructure = async payload => {
    return await MySQL.executeReducer(ADD_NEW_STRUCT, {
        pid: payload.pid,
        name: payload.name
    });
};

exports.getStructures = async () => {
    return await MySQL.executeReducer(GET_STRUCTS, {});
};

exports.getStructure = async payload => {
    return await MySQL.executeReducer(GET_STRUCT_BY_ID, {id: payload.id});
};

exports.getStructuresOfParent = async payload => {
    return await MySQL.executeReducer(GET_STRUCTS_OF_PARENT, {pid: payload.pid});
};

exports.updateStructure = async payload => {
    return await MySQL.executeReducer(UPDATE_STRUCT_BY_ID, {
        id: payload.id,
        name: payload.name,
    });
};

exports.removeStructure = async payload => {
    return await MySQL.executeReducer(REMOVE_STRUCT, {id: payload.id});
};
