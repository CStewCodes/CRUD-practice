// -- declare dependencies --

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { Pool } = require("pg");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;

const pool = new Pool({ connectionString: process.env.CONNECTION_STRING });


pool.connect();

app.get("/todo", (req, res) => {
  pool.query("SELECT * FROM to_do").then((result) => {
    res.send(result.rows);
  });
});

app.delete("/todo/:id", (req, res) => {
  pool
    .query(`DELETE FROM todo_list WHERE id =${req.params.id} RETURNING *`)
    .then((result) => {
      res.send(`Task ${result?.rows[0].task} has been deleted.`);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
  console.log(`${err} theres a problem!`);
});

//listener
app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});
