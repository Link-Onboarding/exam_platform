const MySQL = require("../library/MySQL/reducers");

const CREATE_CATEGORY = "CREATE_CATEGORY";
MySQL.addReducer(CREATE_CATEGORY, `INSERT INTO categories
(name) 
VALUES (@name)
`);

const GET_CATEGORIES = "GET_CATEGORIES";
MySQL.addReducer(GET_CATEGORIES, `SELECT * FROM categories`);

const UPDATE_CATEGORY = "UPDATE_CATEGORY";
MySQL.addReducer(UPDATE_CATEGORY, `UPDATE categories SET name = @name WHERE id = @id`);

const REMOVE_CATEGORY = "REMOVE_CATEGORY";
MySQL.addReducer(REMOVE_CATEGORY, `DELETE FROM categories WHERE id = @id`);

exports.getCategories = async () => {
    return await MySQL.executeReducer(GET_CATEGORIES, {});
};

exports.createCategory = async payload => {
    return await MySQL.executeReducer(CREATE_CATEGORY, {
        name: payload.name
    });
};

exports.updateCategory = async payload => {
    return await MySQL.executeReducer(UPDATE_CATEGORY, {
        id: payload.id,
        name: payload.name
    });
};

exports.removeCommand = async payload => {
    return await MySQL.executeReducer(REMOVE_CATEGORY, {id: payload});
};