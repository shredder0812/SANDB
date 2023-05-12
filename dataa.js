const DB_HOST = "localhost";
const DB_USERNAME = "tung";
const DB_PASSWORD = "tung";
const DB_SCHEMA = "dbsan";

var pg = require("pg");
var conString = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_SCHEMA}`;
var cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fetch = require('node-fetch')
//const importSpatial = require("./import.js");
async function main() {
  var client = new pg.Client(conString);

  await app.use(cors());
  await app.use(bodyParser.json());
  //localhost:3000
  await app.listen(3000, () => {
    console.log("listening");
  });



  //fetch the database
  // users
  // await app.get("/users", (req, res) => {
  //   client.query(`select * from public.users`, (err, result) => {
  //     if (!err) {
  //       res.send(result.rows);
  //     }
  //   });

  //   client.end;
  // });
  





  //client connect
  await client.connect();
  console.log("connection established");



  //INSERT
  var importjsondata = require('./testfull.js');
  //await client.query(importjsondata.insertPolyline);
  //thêm if exist
  await client.query(importjsondata.insertPolyline, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Data P insert successful');
    client.end();
  });
  await client.query(importjsondata.insertLine, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Data L insert successful');
    client.end();
  });
  await client.query(importjsondata.insertCircle, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Data C insert successful');
    client.end();
  });



}

main();
//printValues(obj)
