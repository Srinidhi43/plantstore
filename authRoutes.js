const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();

/* ================= SIGNUP ================= */
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    //  validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(sql, [name, email, hashedPassword], (err, result) => {

            if (err) {
                console.error(err);
                return res.status(400).json({ message: "Email already exists" });
            }

            res.json({
                message: "Signup successful",
                userId: result.insertId
            });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

/* ================= LOGIN ================= */
router.post("/login", (req, res) => {
    const { email, password, role } = req.body;

    //  validation
    if (!email || !password || !role) {
        return res.status(400).json({ message: "Email, password and role required" });
    }

    //  restrict role values
    if (role !== "admin" && role !== "user") {
        return res.status(400).json({ message: "Invalid role" });
    }

    const table = role === "admin" ? "admin" : "users";

    const sql = `SELECT * FROM ${table} WHERE email=?`;

    db.query(sql, [email], async (err, result) => {

        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error" });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = result[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name || "Admin",
                email: user.email,
                role: role
            }
        });
    });
});

module.exports = router;