const Order = require("../models/Order");

// ==============================
// Dashboard Statistics
// ==============================

const getDashboardStats = async (req, res) => {

    try {

        const orders = await Order.find();

        let totalSales = 0;
        let todaySales = 0;
        let inProgress = 0;
        let shipping = 0;
        let delivered = 0;

        const today = new Date().toDateString();

        orders.forEach(order => {

            totalSales += order.price;

            if (
                new Date(order.createdAt).toDateString() === today
            ) {
                todaySales += order.price;
            }

            if (order.status === "Processing" || order.status === "In Progress") {
                inProgress++;
            }

            if (order.status === "Shipping") {
                shipping++;
            }

            if (order.status === "Delivered") {
                delivered++;
            }

        });

        res.json({

            success: true,

            totalOrders: orders.length,

            totalSales,

            todaySales,

            inProgress,

            shipping,

            delivered

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==============================
// Recent Orders
// ==============================

const getRecentOrders = async (req, res) => {

    try {

        const orders = await Order
            .find()
            .sort({ createdAt: -1 })
            .limit(5);

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

};

// ==============================
// Get All Orders
// ==============================

const getAllOrders = async (req, res) => {

    try {

        const orders = await Order
            .find()
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

};

// ==============================
// Update Order Status
// ==============================

const updateOrderStatus = async (req, res) => {

    try {

        const { id } = req.params;

        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(

            id,

            { status },

            { new: true }

        );

        if (!order) {

            return res.status(404).json({

                success: false,

                message: "Order Not Found"

            });

        }

        res.json({

            success: true,

            message: "Order Updated",

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

};

// ==============================
// Delete Order
// ==============================

const deleteOrder = async (req, res) => {

    try {

        const { id } = req.params;

        await Order.findByIdAndDelete(id);

        res.json({

            success: true,

            message: "Order Deleted"

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==============================

module.exports = {

    getDashboardStats,

    getRecentOrders,

    getAllOrders,

    updateOrderStatus,

    deleteOrder

};