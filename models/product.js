const mongoose = require("mongoose");

// ===================================
// Product Schema
// ===================================

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        default: ""
    },

    price: {
        type: Number,
        required: true
    },

    discount: {
        type: Number,
        default: 0
    },

    image: {
        type: String,
        default: ""
    },

    stock: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ["Available", "Out of Stock"],
        default: "Available"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

// ===================================

module.exports = mongoose.model("Product", productSchema);