const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const yakRoutes = require("./routes/yakRoutes");

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

app.use("/", yakRoutes);

// MONGO CONNECTION
mongoose
  .connect(
    "mongodb+srv://bhattkailash786:bBiA6CLmaxHTPuL0@cluster0.quq5b.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
