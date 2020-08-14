const express = require("express")
const server = express()

//public folder config
server.use(express.static("public"))

//routes config
server.get("/",  (req, res)=>{
   res.sendFile(__dirname + "/views/index.html")
} )
server.get("/create-point",  (req, res)=>{
   res.sendFile(__dirname + "/views/create-point.html")
} )
server.get("/search-results",  (req, res)=>{
   res.sendFile(__dirname + "/views/search-results.html")
} )

//turn server on
server.listen(3000)