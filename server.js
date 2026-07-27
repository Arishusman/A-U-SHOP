const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes"); // ✅ NEW

const app = express();

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());
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

// ===============================
// MongoDB Connection
// ===============================
mongoose.connect(process.env.MONGO_URI)
.then(() => {

    console.log("✅ MongoDB Connected");

    app.listen(5000, () => {

        console.log("🚀 Server Running On Port 5000");

    });

})
.catch((err) => {

    console.log("MongoDB Error:", err);

});