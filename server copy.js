const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

/* TEST ROUTE */
app.get("/", (req, res) => {
    res.send("Backend running successfully");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
