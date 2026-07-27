const mongoose = require("mongoose");

// ===================================
// Store Settings Schema
// ===================================

const settingSchema = new mongoose.Schema({

    // Store Information
    storeName: {
        type: String,
        default: "A.U SHOP"
    },

    logo: {
        type: String,
        default: ""
    },

    // Hero Section
    heroTitle: {
        type: String,
        default: "Welcome To A.U SHOP"
    },

    heroDescription: {
        type: String,
        default: "Best Online Shopping Store"
    },

    // Contact Details
    phone: {
        type: String,
        default: ""
    },

    email: {
        type: String,
        default: ""
    },

    address: {
        type: String,
        default: ""
    },

    // Social Media
    facebook: {
        type: String,
        default: ""
    },

    instagram: {
        type: String,
        default: ""
    },

    whatsapp: {
        type: String,
        default: ""
    },

    youtube: {
        type: String,
        default: ""
    },

    // Theme
    primaryColor: {
        type: String,
        default: "#0b5ed7"
    },

    secondaryColor: {
        type: String,
        default: "#FFD700"
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }

});

// ===================================

module.exports = mongoose.model("Setting", settingSchema);