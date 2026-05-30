const express = require("express");
const router = express.Router();
const db = require("../db");

const multer = require("multer");
const path = require("path");

/* ================= MULTER CONFIG ================= */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/");   // folder where images will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

/* ================= ADMIN CHECK ================= */
function checkAdmin(req, res, next) {
    if (req.headers.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Access denied" });
    }
}

/* ================= ADD PRODUCT (WITH IMAGE UPLOAD) ================= */
router.post("/add-product", checkAdmin, upload.single("image"), (req, res) => {

    const { name, price, category } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !price || !category || !image) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = `
        INSERT INTO products (name, price, description, image)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, price, category, image], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error adding product" });
        }

        res.json({
            message: "Product added successfully",
            productId: result.insertId
        });
    });
});

/* ================= DELETE PRODUCT ================= */
router.delete("/delete-product/:id", checkAdmin, (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM products WHERE id=?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Delete failed" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Deleted successfully" });
    });
});

/* ================= UPDATE PRODUCT ================= */
router.put("/update-product/:id", checkAdmin, (req, res) => {
    const id = req.params.id;
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
        return res.status(400).json({ message: "All fields required" });
    }

    const sql = `
        UPDATE products
        SET name=?, price=?, description=?
        WHERE id=?
    `;

    db.query(sql, [name, price, category, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error updating product" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Updated successfully" });
    });
});

module.exports = router;