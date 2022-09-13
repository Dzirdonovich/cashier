const Router = require("express");
const router = new Router();
const pizzaController = require("../controllers/pizzaController");

router.get("/", pizzaController.getPizza);
router.post("/", pizzaController.createPizza);

module.exports = router;
