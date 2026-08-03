const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Counter = require("../models/Counter");

// ==========================================
// GENERATE ORDER ID
// ==========================================

async function generateOrderId() {

    const counter = await Counter.findByIdAndUpdate(

        "order",

        {
            $inc: {
                sequence: 1
            }
        },

        {
            new: true,
            upsert: true
        }

    );

    return "AU-" + String(counter.sequence).padStart(6, "0");

}

// ==========================================
// CREATE ORDER
// ==========================================

router.post("/", async (req, res) => {

    try {

        console.log("BODY =", req.body);

        const orderId = await generateOrderId();

        const newOrder = new Order({

            orderId,

            customerName: req.body.customerName,

            phone: req.body.phone,

            address: req.body.address,

            productName: req.body.productName,

            quantity: req.body.quantity || 1,

            price: req.body.price,

            paymentMethod: "Cash On Delivery",

            paymentStatus: "Pending",

            status: "Processing"

        });

        const savedOrder = await newOrder.save();

        res.status(201).json({

            success: true,

            message: "Order Saved Successfully",

            order: savedOrder

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

// ==========================================
// GET ALL ORDERS
// ==========================================

router.get("/", async (req, res) => {

    try {

        const orders = await Order.find()

            .sort({ createdAt: -1 });

        res.json({

            success: true,

            orders

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

// ==========================================
// UPDATE ORDER STATUS
// ==========================================

router.put("/:id", async (req, res) => {

    try {

        const updatedOrder = await Order.findByIdAndUpdate(

            req.params.id,

            {
                status: req.body.status
            },

            {
                new: true
            }

        );

        if (!updatedOrder) {

            return res.status(404).json({

                success: false,

                message: "Order Not Found"

            });

        }

        res.json({

            success: true,

            order: updatedOrder

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

// ==========================================
// DELETE ORDER
// ==========================================

router.delete("/:id", async (req, res) => {

    try {

        const deletedOrder = await Order.findByIdAndDelete(

            req.params.id

        );

        if (!deletedOrder) {

            return res.status(404).json({

                success: false,

                message: "Order Not Found"

            });

        }

        res.json({

            success: true,

            message: "Order Deleted Successfully"

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

// ==========================================
// TRACK BY PHONE NUMBER
// ==========================================

router.get("/track/phone/:phone", async (req, res) => {

    try {

        const orders = await Order.find({

            phone: req.params.phone

        }).sort({

            createdAt: -1

        });

        if (orders.length === 0) {

            return res.status(404).json({

                success: false,

                message: "No Orders Found"

            });

        }

        res.json({

            success: true,

            orders

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

// ==========================================
// TRACK BY ORDER ID
// ==========================================

router.get("/track/order/:orderId", async (req, res) => {

    try {

        const order = await Order.findOne({

            orderId: req.params.orderId

        });

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

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

// ==========================================
// EXPORT
// ==========================================

module.exports = router;