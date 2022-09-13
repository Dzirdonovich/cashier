const { Order, Pizza, PizzasOrder } = require("../models/models");

class PizzaController {
  async createPizza(req, res) {
    const { price, name } = req.body;
    const pizza = await Pizza.create({ price, name });
    return res.json(pizza);
  }
  async getPizza(req, res) {
    const pizzas = await Pizza.findAll();
    res.json({ pizzas });
  }
}

module.exports = new PizzaController();
