const express = require('express');
const router = express.Router();

const rootModule = require('../../components/root');

const Product = rootModule.product;

router.post("/",async (req, res) => {
    res.send({
        payload: {
            products: await Product.getProducts()
        },
        error: false
    });
});

router.post("/reviews",async (req, res) => {
    await Product.updateProductReviews(req.body);
    
    res.send({
        payload: {},
        error: false
    });
});

router.post("/add",async (req, res) => {
    await Product.insertNewProduct(req.body);
    
    res.send({
        payload: {},
        error: false
    });
});

router.post("/update",async (req, res) => {
    await Product.updateProductById(req.body);
    
    res.send({
        payload: {},
        error: false
    });
});

router.post("/remove", async (req, res) => {
    await Product.removeProductById(req.body);
    
    res.send({
        payload: {},
        error: false
    });
});

module.exports = router;