const express = require("express");
const router = express.Router();
const db = require("../db");

/* ================= PLACE ORDER ================= */
router.post("/", (req, res) => {
  const {
    user_id,
    customer_name,
    address,
    city,
    pincode,
    total_price,
    order_items
  } = req.body;

  // ✅ Validation
  if (!customer_name || !address || !city || !pincode || !total_price || !order_items) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `
        INSERT INTO orders 
        (user_id, customer_name, address, city, pincode, total_price, order_items)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    sql,
    [
      user_id,
      customer_name,
      address,
      city,
      pincode,
      total_price,
      JSON.stringify(order_items)
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }

      res.json({
        message: "Order placed successfully",
        orderId: result.insertId
      });
    }
  );
});

/* ================= GET ALL ORDERS (ADMIN) ================= */
router.get("/", (req, res) => {

  if (req.headers.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  db.query("SELECT * FROM orders ORDER BY created_at DESC", (err, result) => {

    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching orders" });
    }

    // convert JSON string → object
    const orders = result.map(order => ({
      ...order,
      order_items: JSON.parse(order.order_items)
    }));

    res.json(orders);
  });
});

/* ================= GET USER ORDERS ================= */
router.get("/user/:id", (req, res) => {
  const userId = req.params.id;

  db.query(
    "SELECT * FROM orders WHERE user_id=? ORDER BY created_at DESC",
    [userId],
    (err, result) => {

      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching user orders" });
      }

      const orders = result.map(order => ({
        ...order,
        order_items: JSON.parse(order.order_items)
      }));

      res.json(orders);
    }
  );
});

module.exports = router;