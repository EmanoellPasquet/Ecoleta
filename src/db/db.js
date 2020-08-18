//importing sqlite3 dependency

const sqlite3 = require("sqlite3").verbose();

// creating object to manipulate db

const db = new sqlite3.Database("src/db/database.db");

module.exports = db;

//operating db object to manipulate db

/*db.serialize(() => {
  // creating a table
  db.run(`
      CREATE TABLE IF NOT EXISTS location (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         image TEXT, 
         name TEXT,
         adress TEXT, 
         adress2 TEXT, 
         state, TEXT,
         city TEXT,
         items TEXT
      );
   `);

  //inserting data
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
          "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
          "Colectoria",
           "Guilherme Gemballa, Jardim América",
           "Nº 260",
           "Santa Catarina",
           "Rio do Sul",
           "Resíduos Eletrônicos, Lâmpadas"
   ]
   
   function AfterInsert(err){
      if (err) {
         return console.log(err)
      }
      console.log("Sucess!")
      console.log(this)
   }

   db.run(query, values, AfterInsert)

 //consulting data
 

 db.all(`SELECT * FROM location`, function(err, rows){
    if (err) {
       return console.log(err)
    }
    console.log("Persisted data: ")
    console.log(rows)
 })*/

//deleting data
/*for (let i = 1; i < 18; i++) {
  db.run(`DELETE FROM location WHERE id = ?`, [i], function (err, rows) {
    if (err) {
      return console.log(err);
    }
    console.log("Deleted successfully");
    console.log(rows);
  });
}*/

//});
