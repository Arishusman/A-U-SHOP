const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// ==========================
// Create Order
// ==========================
router.post("/", async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const newOrder = new Order({
            customerName: req.body.customerName,
            phone: req.body.phone,
            address: req.body.address,
            productName: req.body.productName,
            quantity: req.body.quantity,
            price: req.body.price
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            success: true,
            message: "Order Saved Successfully",
            order: savedOrder
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// ==========================
// Get All Orders
// ==========================
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            orders
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// ==========================
// Update Order Status
// ==========================
router.put("/:id", async (req, res) => {
    try {
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.json({
            success: true,
            order: updatedOrder
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// ==========================
// Delete Order
// ==========================
router.delete("/:id", async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Order Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
// ==========================
// Track Order By Phone
// ==========================
router.get("/track/:phone", async (req, res) => {
    try {

        const order = await Order.findOne({
            phone: req.params.phone
        }).sort({ createdAt: -1 });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found"
            });
        }

        res.json({
            success: true,
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});

module.exports = router;