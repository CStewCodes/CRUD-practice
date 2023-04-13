// ========== Declare Dependencies ==========
// Here we declare the packages we want to use in this file. They will be pulled from node_modules.
const express = require("express"); // Express gives us  the app object and its methods that actually const us do server connections and handle http requests.
const dotenv = require("dotenv"); // Dotenv is a simple package that lets us load environment variables from a .env file so we can access them later with process.env
const cors = require("cors"); // Cors is a package that allows the server to handle Cross-Origin Requests and respond accordingly. It allows other sites to request data.
const { Pool } = require("pg"); // pg is the package that gives us a Pool object, which can be used to make queries to a postgres database. This can handle a "POOL" of requests by thousands of users at a time, not just one at a time via JS.

// ========== Use dotenv ==========
dotenv.config(); // this line tells the dotenv package to just read the .env file and load the variables there

// ========== Set Up Express ==========
const app = express(); // run the express function to create the app object that we actually want to use
app.use(express.json()); // tell app to parse all incoming requests as json
app.use(cors()); // tell app to use the cors function, to handle cross origin requests
const port = process.env.PORT; // grab the port variable from the environment to use later
//think of the above as 'security at an airport' where everyone who comes thru this site has to get checked by these things.

// ========== Set Up Pool (from the pg package) ==========
// We will talk about Classes later in the course, but this is how you create a new instance of the Pool class
const pool = new Pool({ connectionString: process.env.CONNECTION_STRING });
// To create a new instance of the Pool class, it requires the connection string to know which database to connect to
pool.connect(); // This line just does a test connection to the database. It will throw an error if it cannot connect properly.

// ========== Routes ==========
app.get("/movies", (req, res) => {
  pool.query("SELECT * FROM movies").then((result) => {
    res.send(result.rows);
  });
});

app.get("/movies/:id", (req, res) => {
  pool
    .query(`SELECT * FROM movies WHERE id = ${req.params.id}`)
    .then((result) => {
      res.send(result.rows[0]);
    });
});

// Add an API endpoint to handle movie searches
app.get("/movies/search", (req, res) => {
  const searchTerm = req.query.term;

  // Query the database for the movie based on the search term
  pool
    .query("SELECT * FROM movies WHERE movie_name = $1", [searchTerm])
    .then((result) => {
      res.send(result.rows[0]);
    }).catch((err) => {
      res.status(500).send(err.message);
      console.log(err);
    })
});

app.post("/movies", (req, res) => {
  let movie_name = req.body.movie_name;
  let released_date = req.body.released_date;
  let run_time = req.body.run_time;
  let rating = req.body.rating;
  pool
    .query(
      `INSERT INTO movies (movie_name, released_date, run_time, rating) VALUES ($1, $2, $3, $4) RETURNING *`,
      [movie_name, released_date, run_time, rating]
    )
    .then((result) => {
      res.send(result.rows);
      console.log(result.rows);
    })
    .catch((err) => {
      res.status(500).send(err.message);
      console.log(err);
    });
});

app.patch("/movies/:id", (req, res) => {
  const movie_name = req.body.movie_name;
  const released_date = req.body.released_date;
  const run_time = req.body.run_time;
  const rating = req.body.rating;
  //use COALESCE to keep your site from crashing if your user decides to patch less than all of the parameters.
  pool
    .query(
      `UPDATE movies SET movie_name= COALESCE($1, movie_name), released_date=COALESCE($2, release_date), run_time = COALESCE($3, run_time), rating=COALESCE($4, rating) WHERE id = ${req.params.id} RETURNING *`,
      [movie_name, released_date, run_time, rating]
    )
    .then((result) => {
      res.send(result.rows);
      console.log(result.rows);
    })
    .catch((err) => {
      res.status(500).send(err.message);
      console.log(err);
    });
});

app.delete("/movies/:id", (req, res) => {
  pool
    .query(`DELETE FROM movies WHERE id=${req.params.id} RETURNING *`)
    .then((result) => {
      res.send(`Movie ${result?.rows[0].movie_name} has been deleted.`);
      console.log(
        `${result?.rows[0].movie_name} and its data has been deleted.`
      );
    })
    .catch((err) => {
      res.status(500).send(err.message);
      console.log(`${err} there's a problem`);
    });
});

// ========== Listener ==========
// This part must be the last thing in the file. It tells the app what port to listen to for new http requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
