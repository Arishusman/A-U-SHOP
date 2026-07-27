const express = require("express");

const router = express.Router();

const {

    getDashboardStats,

    getRecentOrders,

    getAllOrders,

    updateOrderStatus,

    deleteOrder

} = require("../Controllers/dashboardController");

// ===================================
// Dashboard Statistics
// ===================================

router.get("/stats", getDashboardStats);

// ===================================
// Recent Orders
// ===================================

router.get("/recent", getRecentOrders);

// ===================================
// All Orders
// ===================================

router.get("/orders", getAllOrders);

// ===================================
// Update Order Status
// ===================================

router.put("/orders/:id", updateOrderStatus);

// ===================================
// Delete Order
// ===================================

router.delete("/orders/:id", deleteOrder);

// ===================================

module.exports = router;