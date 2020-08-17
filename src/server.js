const express = require("express");
const server = express();

//get database

const db = require("./db/db.js");

//public folder config
server.use(express.static("public"));

//template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

//routes config
server.get("/", (req, res) => {
  return res.render("index.html");
});
server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});
server.get("/search", (req, res) => {
  //getting data from database

  db.all(`SELECT * FROM location`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    console.log("Persisted data: ");
    console.log(rows);
    //show html with data from database
    return res.render("search-results.html", { location: rows });
  });
});

//turn server on
server.listen(3000);
