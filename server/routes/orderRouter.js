const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");

router.post("/", orderController.createOrder);
router.get("/", orderController.getOrder);
router.get("/deleteOrder/:id", orderController.deleteOrder);

module.exports = router;
