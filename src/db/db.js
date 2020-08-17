//importing sqlite3 dependency

const sqlite3 = require('sqlite3').verbose()

// creating object to manipulate db

const db = new sqlite3.Database("src/db/database.db")

//operating db object to manipulate db