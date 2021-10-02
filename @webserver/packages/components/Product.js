const MySQL = require("../library/MySQL/reducers");

const INSERT_NEW_PRODUCT = "INSERT_NEW_PRODUCT";
MySQL.addReducer(INSERT_NEW_PRODUCT, `INSERT INTO products
    (id, image, title, description, stock, price, category, reviews_cnt, reviews_sum, date, promo) 
    VALUES (@id, @image, @title, @description, @stock, @price, @category, 0, 0, SYSDATE(), @promo)
`);

const GET_PRODUCTS = "GET_PRODUCTS";
MySQL.addReducer(GET_PRODUCTS, "SELECT * FROM products");

const UPDATE_PRODUCT_BY_ID = "UPDATE_PRODUCT_BY_ID";
MySQL.addReducer(UPDATE_PRODUCT_BY_ID, `UPDATE products SET 
image = @image, title = @title, description = @description, stock = @stock, price = @price, category = @category, promo = @promo
WHERE id = @id`);

const UPDATE_PRODUCT_REVIEWS = "UPDATE_PRODUCT_REVIEWS";
MySQL.addReducer(UPDATE_PRODUCT_REVIEWS, `UPDATE products SET 
reviews_cnt = @reviews_cnt, reviews_sum = @reviews_sum
WHERE id = @id`);

const REMOVE_PRODUCT_BY_ID = "REMOVE_PRODUCT_BY_ID";
MySQL.addReducer(REMOVE_PRODUCT_BY_ID, `DELETE FROM products WHERE id = @id`);

exports.insertNewProduct = async payload => {
    return await MySQL.executeReducer(INSERT_NEW_PRODUCT, {
        id: payload.id,
        image: payload.image,
        title: payload.title,
        description: payload.description,
        stock: payload.stock,
        price: payload.price,
        category: payload.category,
        promo: payload.promo
    });
};

exports.getProducts = async () => {
    return await MySQL.executeReducer(GET_PRODUCTS, {});
};

exports.updateProductById = async payload => {
    return await MySQL.executeReducer(UPDATE_PRODUCT_BY_ID, {
        id: payload.id,
        image: payload.image,
        title: payload.title,
        description: payload.description,
        stock: payload.stock,
        price: payload.price,
        category: payload.category,
        promo: payload.promo
    });
};

exports.updateProductReviews = async payload => {
    return await MySQL.executeReducer(UPDATE_PRODUCT_REVIEWS, {
        id: payload.id,
        reviews_cnt: payload.reviews_cnt,
        reviews_sum: payload.reviews_sum
    });
};

exports.removeProductById = async payload => {
    return await MySQL.executeReducer(REMOVE_PRODUCT_BY_ID, {id: payload});
};
