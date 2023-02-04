require("dotenv").config();
const { Client } = require("pg");
// const fs = require("fs");

const db = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});




db.connect()
  .then(() => console.log("connected to DB"))
  .catch((e) => console.log(`Error connecting to Postgres server:\n${e}`));

const create = fs.readFileSync("config/schema/create.sql", { encoding: "utf8" });
const seed = fs.readFileSync("config/schema/seed.sql", { encoding: "utf8" });

db.query(create)
  .then(() => console.log("Tables Reloaded"))
  .then(() => db.query(seed))
  .then(() => console.log("DB Seeded"))
  .then(() => {
    const testing = db.query("SELECT * from banks");
    return testing;
  })
  .then((testing) => console.log("testing", testing.rows))
  .catch((e) => {
    console.log(e.message);
  });

module.exports = db;
