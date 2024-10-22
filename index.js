const express = require("express");
const mongoose = require("mongoose");
const formData = require("./routes/formData")
const dotenv = require('dotenv').config()
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.use('/api/v1/user-data', formData)

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("connected to the DB successfully"))
  .catch((err) => console.log("unable to connect", err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
