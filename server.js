const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes"); // ✅ NEW

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// Middleware
// ===============================
app.use(cors({
    origin:"https://au-shop.netlify.app",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===============================
// Routes
// ===============================
app.get("/", (req, res) => {
    res.send("🚀 A.U SHOP Backend Running");
});

app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes); // ✅ NEW
app.use("/api/admin", adminRoutes);

// ===============================
// MongoDB Connection
// ===============================
mongoose.connect(process.env.MONGO_URI)
.then(() => {

    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running On Port ${PORT}`);
});

    

})
.catch((err) => {

    console.log("MongoDB Error:", err);

});

app.get("/test123", (req, res) => {
    res.send("TEST OK");
});

app.get("/hello", (req, res) => {
    res.send("HELLO WORKING");
});