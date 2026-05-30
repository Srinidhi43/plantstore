 Plant Store Website
An online plant store website built using **HTML, CSS, JavaScript, Node.js, XAMPP, and MySQL**. This project allows users to browse plants, view product details, manage a shopping cart, authenticate users, and simulate an e-commerce shopping experience.

Project Overview

The Plant Store Website is a full-stack web application designed to provide a smooth and aesthetic online shopping experience for plant lovers.

Users can:

* Browse different categories of plants
* View plant details and pricing
* Add/remove products from cart
* Login and Signup
* Place orders through checkout
* Manage plant products (Admin functionality)

The project focuses on responsive UI design, frontend-backend integration, and database management.

### User Features

*  Browse different plant categories
*  View detailed product information
*  Add to cart and manage cart items
*  User Login & Signup Authentication
*  Checkout functionality
*  Responsive user interface
*  Add new plant products
*  Update plant information
*  Delete products
*  Manage inventory/products

 Technologies Used
 Frontend

* HTML5
* CSS3
* JavaScript

Backend

* Node.js
* Express.js

 Database

* MySQL
* XAMPP (Apache + MySQL)


Project Structure

```bash
plant-store/
│── frontend/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
│
│── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── database/
│   └── package.json
│
│── database/
│   └── plantstore.sql

```

---

 Installation & Setup

 1. Clone the Repository

```bash
git clone https://github.com/your-username/plant-store.git
cd plant-store
```

 2. Start XAMPP

* Open XAMPP Control Panel
* Start **Apache**
* Start **MySQL**

 3. Create Database

1. Open **phpMyAdmin**
2. Create a database named:

```sql
plantstore
```

3. Import the SQL file:

```bash
plantstore.sql
```

---

 4. Install Dependencies

Navigate to the backend folder:

```bash
npm install
```

---

 5. Run the Server

```bash
node server.js
```

or

```bash
npm start
```



 Database Configuration

Update database credentials in your configuration file:

```javascript
host: "localhost",
user: "root",
password: "",
database: "plantstore"
```





Future Improvements

* Online payment integration
* Wishlist feature
* Order tracking system
* Search and filter functionality
* Product reviews and ratings

 Learning Outcomes

Through this project, I gained practical experience in:

* Frontend development using HTML, CSS, and JavaScript
* Backend development using Node.js and Express.js
* Database management using MySQL
* CRUD operations
* API integration
* Authentication and cart management
* Full-stack web development concepts


 License

This project is developed for educational purposes.
