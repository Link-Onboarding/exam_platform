const express = require('express');
const router = express.Router();

const rootModule = require('../../components/root');

const Categories = rootModule.categories;

router.post("/",async (req, res) => {
    res.send({
        payload: {
            categories: await Categories.getCategories(),
        },
        error: null
    });
});

router.post("/add",async (req, res) => {
    await Categories.createCategory({
        name: req.body.name
    });

    res.send({
        payload: {},
        error: null
    });
});

router.post("/modify",async (req, res) => {
    await Categories.updateCategory(req.body);

    res.send({
        payload: {},
        error: null
    });
});

router.post("/remove", async (req, res) => {
    await Categories.removeCommand(req.body);

    res.send({
        payload: {},
        error: null
    });
});

module.exports = router;