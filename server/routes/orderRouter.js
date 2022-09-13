const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");

router.post("/", orderController.createOrder);
router.get("/", orderController.getOrder);

module.exports = router;
