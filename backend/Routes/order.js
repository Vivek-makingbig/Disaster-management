const express = require('express');
const Order= require( "../Models/order.js");

const router = express.Router();

// Place order
router.post("/order", async (req,res)=>{
  try {
    const { name, item, quantity } = req.body;
    const order = new Order({ name, item, quantity });
    await order.save();
    res.status(201).json({ message: "Order placed successfully!", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all orders
router.get("/getorders",async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
