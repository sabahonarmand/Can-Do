const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require('./routes/taskRoutes');
const goalRoutes = require('./routes/goalRoutes');

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log(err));

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/goals", goalRoutes);

app.listen(8800, () => {
    console.log("Backend server is running!");
});