const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

/* ================= INIT APP ================= */
const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= STATIC FILES ================= */
app.use(express.static(path.join(__dirname)));   // serve HTML/CSS/JS
app.use("/images", express.static(path.join(__dirname, "images"))); // serve images

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

/* ================= HOMEPAGE ================= */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "HOMEPAGE.HTML"));
});

/* ================= SERVER ================= */
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});