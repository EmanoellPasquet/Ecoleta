const express = require("express");
const server = express();

//get database

const db = require("./db/db.js");

//public folder config
server.use(express.static("public"));

// implementing req.body to use method POST

server.use(express.urlencoded({ extended: true }));

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
  //req.query to get data from the application with GET method (Query String)
  console.log(req.query);

  return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
  //req.body to get data from the application with POST method
  //insert data on db via application

  const query = `
         INSERT INTO location (
            image,
            name,
            adress,
            adress2,
            state, 
            city, 
            items

         ) VALUES ( ?, ?, ?, ?, ?, ?, ?);
            `;

  const values = [
    req.body.image,
    req.body.name,
    req.body.adress,
    req.body.adress2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function AfterInsert(err) {
    if (err) {
      console.log(err);
      return res.send("Erro ao cadastrar");
    }
    console.log("Success!");
    console.log(this);
    return res.render("create-point.html", { saved: true });
  }

  db.run(query, values, AfterInsert);
});

//searching data on database
server.get("/search", (req, res) => {
  const search = req.query.search;
  if (search == "") {
    return res.render("search-results.html", { total: 0 });
  }

  db.all(`SELECT * FROM location WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    const total = rows.length;
    //show html with data from database
    return res.render("search-results.html", { location: rows, total: total });
  });
});

//turn server on
server.listen(3000);
