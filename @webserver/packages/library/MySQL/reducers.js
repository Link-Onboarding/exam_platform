const MySQL = require("./index");

MySQL.setupDatabaseConnection();

let reducers = {};

exports.addReducer = (id, cmd) => {
    reducers[id] = {
        content: cmd
    };
};

exports.executeReducer = async (id, params) => {
    let string = reducers[id].content;

    for (const idx in params) {
        string = string.replace('@' + idx, params[idx] != null?"'" + (typeof params[idx] === "object"?JSON.stringify(params[idx]).slice(1, -1):params[idx]) + "'":"NULL");
    }
    
    return await MySQL.Query(string);
};