const { Order, Pizza, PizzasOrder } = require("../models/models");
class OrderController {
  async createOrder(req, res) {
    const { place, name, pizza } = req.body;
    let priceOrder = 0;

    const order = await Order.create({
      name: name,
      time:
        new Date(Date.now()).getHours().toString().padStart(2, "0") +
        ":" +
        new Date(Date.now()).getMinutes().toString().padStart(2, "0"),
      number:
        (await Order.findOne({
          order: [["createdAt", "DESC"]],
        }).then((data) => data?.createdAt)) <= new Date(Date.now()).getDate()
          ? 1
          : (await Order.findAll()).length + 1,
      price: 0,
      place,
    });

    let orderPrice = 0;

    await pizza.map(async (value) => {
      const { price } = await Pizza.findOne({ name: value.name });

      await PizzasOrder.create({
        pricePizzaOrder:
          value.size === 25
            ? price
            : value.size === 30
            ? price * 1.5
            : price * 2,
        name: value.name,

        size: value.size,
        orderId: order.id,
      });
      await order.update({
        pizzaOrder: await PizzasOrder.findAll({
          where: { orderId: order.id },
        }),
      });
    });

    return res.json({ order, pizza });
  }
  async getOrder(req, res) {
    let priceOrder = 0;
    await Order.findOne({
      order: [["createdAt", "DESC"]],
    }).then(async (data) => {
      data.pizzaOrder.map((value) => {
        priceOrder += value.pricePizzaOrder;
      });
      await data.update({ price: priceOrder });
    });

    let orders = await Order.findAll();

    res.json({ orders });
  }
}

module.exports = new OrderController();
