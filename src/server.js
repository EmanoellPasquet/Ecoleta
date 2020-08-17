const express = require("express");
const server = express();

//get database

const db = require("./db/db.js");

//public folder config
server.use(express.static("public"));

// implementing req.body to use method POST

server.use(expre.urlencoded({extended: true}));

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

  return res.render("create-point.html");
});

server.post("/create-point",(req, res)=>{

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
            `

  const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items,
   ]
   
   function AfterInsert(err){
      if (err) {
         return console.log(err)
      }
      console.log("Sucess!")
      console.log(this)
      return res.render("create-point",{saved: true})
   }

   db.run(query, values, AfterInsert)

})

server.get("/search", (req, res) => {
  //getting data from database

  db.all(`SELECT * FROM location`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    const total = rows.lenght
    //show html with data from database
    return res.render("search-results.html", { location: rows, total });
  });
});

//turn server on
server.listen(3000);
