const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const controllers = require('./controllers/controller');

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/budget", controllers);


app.get('/', (req, res) => {
    res.send("welcome")
});

app.get("*", (req, res) => {
    //res.status(404).redirect("/budget")
    res.status(404).send("No page found!")
})


module.exports = app;

