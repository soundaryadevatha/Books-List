const express = require('express');
const mongoose = require("mongoose");

var cors = require('cors');

const app = express();

//routes
const books = require('./routes/api/books');

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8081;

//use Database
let mongoConnUrl = "mongodb://localhost/marchnode22";
mongoose.connect(mongoConnUrl, { useNewUrlParser: true });
let db = mongoose.connection;
db.on("error", function (error) {
  console.log("Error came in connecting" + error);
});
db.on("open", function () {
  console.log("yes, we are connected to mongodb and the database");
});

// use Routes
app.use('/api/books', books);

app.listen(port, () => console.log(`Server running on port ${port}`));