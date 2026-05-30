const express = require("express");
const db = require("../db");

const router = express.Router();

/* ================= GET ALL PRODUCTS ================= */
router.get("/", (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) {
            console.error("DB ERROR:", err);
            return res.status(500).json({ message: "Error fetching products" });
        }
        res.json(result);
    });
});

/* ================= GET SINGLE PRODUCT ================= */
router.get("/:id", (req, res) => {
    const id = req.params.id;

    db.query(
        "SELECT * FROM products WHERE id=?",
        [id],
        (err, result) => {

            if (err) {
                console.error("DB ERROR:", err);
                return res.status(500).json({ message: "Error fetching product" });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: "Product not found" });
            }

            res.json(result[0]);
        }
    );
});

module.exports = router;