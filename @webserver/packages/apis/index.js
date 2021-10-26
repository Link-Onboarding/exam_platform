const express = require('express');
const router = express.Router();

router.use("/user/", require("./users/index"));
// router.use("/categories/", require("./categories/index"));
// router.use("/commands/", require("./commands/index"));
// router.use("/products/", require("./products/index"));
// router.use("/newsletter/", require("./newsletter/index"));

module.exports = router;