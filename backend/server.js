require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectToDB = require('./Database/db');
const auth = require('./routes/auth');
const app = express();
app.use(cors());
app.use(express.json());

connectToDB();

app.use("/auth", auth);
// app.use("/customer",require("./Routes/order"));

app.listen(5000, () => {
    console.log("Server running on port 5000");
}
);