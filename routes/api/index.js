const router = require("express").Router();
const routes = require("./mood");

router.use("/mood", routes);

module.exports = router;
