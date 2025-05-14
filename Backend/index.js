const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();

const SECRET_KEY = "supersecretadmin";
const JWT_SECRET = "your_jwt_secret";

app.use(cors());
app.use(express.json());

// MIDDLEWARE
const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(402).json({ message: "Invalid token." });
  }
};

app.post("/admin/login", (req, res) => {
  const { secret } = req.body;
  if (secret === SECRET_KEY) {
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ token });
  } else {
    res.json({ message: "Invalid secret" });
  }
});

// PROTECTED ROUTE
app.get("/admin/api/data", verifyJWT, (req, res) => {
  res.json({ message: "Protected route accessible." });
});

app.listen(5002, () => console.log("Server is running on PORT 5002"));
