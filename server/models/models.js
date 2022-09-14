const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  telephone: {
    type: DataTypes.STRING,
  },
  time: {
    type: DataTypes.STRING,
  },
  number: {
    type: DataTypes.INTEGER,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  place: {
    type: DataTypes.INTEGER,
  },
  pizzaOrder: {
    type: DataTypes.JSON,
  },
});

const PizzasOrder = sequelize.define("pizzaOrder", {
  pizzasOrderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  pricePizzaOrder: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
  size: {
    type: DataTypes.INTEGER,
  },
  count: {
    type: DataTypes.INTEGER,
  },
});
const Pizza = sequelize.define("pizza", {
  pizzaId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
});

Order.hasMany(PizzasOrder);
PizzasOrder.belongsTo(Order);

PizzasOrder.hasOne(Pizza);
Pizza.belongsTo(PizzasOrder);

module.exports = {
  PizzasOrder,
  Pizza,
  Order,
};
