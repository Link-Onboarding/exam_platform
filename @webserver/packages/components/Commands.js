const MySQL = require("../library/MySQL/reducers");

const CREATE_NEW_COMMAND = "CREATE_NEW_COMMAND";
MySQL.addReducer(CREATE_NEW_COMMAND, `INSERT INTO commands
(id, user_id, adress, cart_list, obs) 
VALUES (@id, @user_id, @adress, @cart_list, @obs)
`);

const MODIFY_COMMAND = "MODIFY_COMMAND";
MySQL.addReducer(MODIFY_COMMAND, `UPDATE commands SET 
adress = @adress, 
cart_list = @cart_list, 
obs = @obs 
WHERE id = @id`);

const REMOVE_COMMAND = "REMOVE_COMMAND";
MySQL.addReducer(REMOVE_COMMAND, "DELETE FROM commands WHERE id = @id");

const GET_ALL_COMMANDS = "GET_ALL_COMMANDS";
MySQL.addReducer(GET_ALL_COMMANDS, "SELECT * FROM commands");

const GET_MAX_ID_CMD = "GET_MAX_ID_CMD";
MySQL.addReducer(GET_MAX_ID_CMD, "SELECT MAX(id) FROM commands");

const GET_COMMANDS_OF_USER = "GET_COMMANDS_OF_USER";
MySQL.addReducer(GET_COMMANDS_OF_USER, "SELECT * FROM commands WHERE user_id = @user_id");

const GET_COMMAND = "GET_COMMAND";
MySQL.addReducer(GET_COMMAND, "SELECT * FROM commands WHERE id = @id");

exports.createNewCommand = async payload => {
    return await MySQL.executeReducer(CREATE_NEW_COMMAND, {
        id: payload.id,
        user_id: payload.userId,
        adress: payload.adress,
        cart_list: payload.cart_list,
        obs: payload.obs,
    });
};

exports.modifyCommand = async payload => {
    return await MySQL.executeReducer(MODIFY_COMMAND, {
        id: payload.id,
        adress: payload.adress,
        phone: payload.phoneNumber
    });
};

exports.removeCommand = async payload => {
    return await MySQL.executeReducer(REMOVE_COMMAND, {id: payload});
};

exports.getAllCommands = async () => {
    return await MySQL.executeReducer(GET_ALL_COMMANDS, {});
};

exports.getMaxIdCommand = async () => {
    const data = await MySQL.executeReducer(GET_MAX_ID_CMD, {});

    return data[0]["MAX(*)"];
};

exports.getUserCommands = async payload => {
    return await MySQL.executeReducer(GET_COMMANDS_OF_USER, {user_id: payload});
};

exports.getCommand = async payload => {
    return await MySQL.executeReducer(GET_COMMAND, {id: payload});
};
