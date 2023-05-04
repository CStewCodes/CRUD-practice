const movieApiUrl = "http://localhost:3001/get-movie-by-name";
const getAllMovies = "http://localhost:3001/movies";

const textInput = document.querySelector("#text-search");
const searchButton = document.querySelector("#search-button");
const newMovieName = document.querySelector("#movie-name");
const newReleaseDate = document.querySelector("#release-date");
const newRunTime = document.querySelector("#run-time");
const newRating = document.querySelector("#rating");
const newMovieButton = document.querySelector("#add-movie-button");

async function fetchAllData() {
  const response = await fetch(getAllMovies);
  // console.log(data)
  return response.json();
}

async function fetchData() {
  const response = await fetch(movieApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: textInput.value,
    }),
  });

  return await response.json();
}

async function newMovieData() {
  document.querySelector(".results").innerHTML = "";
  const response = await fetch(getAllMovies, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      movie_name: newMovieName.value,
      released_date: newReleaseDate.value,
      run_time: newRunTime.value,
      rating: newRating.value,
    }),
  });

  return await response.json();
}

/*
 --- Vanilla (Dynamic) DOM manipulation ---
create a function that takes in the JSON data as params;
create new variables-- body, newDiv, h1, h2, span, label
add attribute to newDiv--> ('id', 'card')

*/
function createCard(id, movieName, rating, releaseDate, runTime) {
  let results = document.querySelector(".results");
  let newDiv = document.createElement("div");
  newDiv.setAttribute("id", "card");
  let h1 = document.createElement("h1");
  let h2 = document.createElement("h2");
  let span = document.createElement("span");
  let label = document.createElement("label");
  var deleteMovie = document.createElement("button");
  h1.innerText = `${movieName}`;
  h2.innerText = `Rating: ${rating} Stars`;
  span.innerText = `Release Date: ${releaseDate}`;
  label.innerText = `Run Time: ${runTime} Minutes`;
  deleteMovie.innerText = `Delete ME!`;
  newDiv.append(h1);
  newDiv.append(h2);
  newDiv.append(span);
  newDiv.append(label);
  newDiv.append(deleteMovie);

  $(deleteMovie).on("click", () => {
    fetch(`/movies/${id}`, {
      method: "DELETE",
    });
  });
  // $(deleteMovie).on("click", async () => {
  //   const deleteMe = async () => {
  //     console.log();
  //     const response = await fetch(`/movies/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         // "Access-Control-Allow-Credentials": "true",
  //       },
  //     });

  //     // Check if the response has a valid JSON content type
  //     const contentType = response.headers.get("content-type");
  //     // if (contentType && contentType.includes("application/json")) {
  //     return await response.json();
  //     // } else {
  //     // console.error("Invalid JSON response:", response);
  //     // }
  //   };
  //   deleteMe();
  // });
  results.append(newDiv);
}
//***** -- add event listener to the button "on click" that fetches the data from the API. -- ******
// ---the VANILLA JS WAY ---
//searchButton.addEventListener("click", async () => {
//   await fetchData().then((data) => {
//     console.log(data);
//     createCard(data.movie_name, data.rating, data.released_date, data.run_time);
//   });
// });

// --- the JQUERY WAY ---
$(searchButton).on("click", () => {
  document.querySelector(".results").innerHTML = "";
  if (textInput.value == "") {
    fetchAllData().then((data) => {
      console.log(data);
      data.map((movie) =>
        createCard(
          movie.id,
          movie.movie_name,
          movie.rating,
          movie.released_date,
          movie.run_time
        )
      );
    });
  } else {
    fetchData().then((data) => {
      console.log(data);
      createCard(
        data.id,
        data.movie_name,
        data.rating,
        data.released_date,
        data.run_time
      );
    });
  }
});

$(newMovieButton).on("click", async () => {
  // document.querySelector(".results").innerHTML = "";
  newMovieData().then((data) => {
    console.log(data);
    data.map((movie) =>
      createCard(
        movie.id,
        movie.movie_name,
        movie.rating,
        movie.released_date,
        movie.run_time
      )
    );
  });
});

/* ADD JQUERY EVENT LISTENER FOR ENTER BUTTON */
$(textInput).on("keypress", async (e) => {
  if (e.which == 13) {
    await fetchAllData().then((data) => {
      createCard(
        data.id,
        data.movie_name,
        data.rating,
        data.released_date,
        data.run_time
      );
    });
  }
});
//parse the info to JSON
//
// console.log("clicked");
// console.log(textInput.value);

//   await fetch(movieApiUrl, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "name": textInput.value
//     })
//   })
//   .then( (await response) => {
//     // handle response
//      console.log( response.json());
//   })
//   .catch(error => {
//     // handle error
//     console.log(error);
//   });
// });

// searchButton.addEventListener("click", () => {
//   let textValue = textInput.value;
//   fetch(`http://localhost:3001/movies/${textValue}`)
//     .then((response) => response.json())
//     .then((result) => {
//       let newDiv = document.createElement("div");
//       newDiv.innerText = result;
//       document.body.append(newDiv);
//       console.log(result);
//     });
// });

// // Add an event listener to the search form
// searchButton.addEventListener('click', () => {
//   // Get the search term from the input field
//   const searchTerm = $('#text-search').val();

//   // Send an AJAX request to the server to search for the movie
//   $.get(`http://localhost:3001/movies/search?term=${searchTerm}`, function(movie) {
//     // Create a card element and populate it with the movie data
//     const card = $('<div>').addClass('card');
//     const cardBody = $('<div>').addClass('card-body');
//     const title = $('<h5>').addClass('card-title').text(movie.movie_name);
//     const releaseDate = $('<p>').addClass('card-text').text(`Released on: ${movie.released_date}`);
//     const runTime = $('<p>').addClass('card-text').text(`Run time: ${movie.run_time} minutes`);
//     const rating = $('<p>').addClass('card-text').text(`Rating: ${movie.rating}/5`);

//     cardBody.append(title, releaseDate, runTime, rating);
//     card.append(cardBody);

//     // Append the card to the page
//     $('#movie-card').empty().append(card);
//   }).fail(function() {
//     // Handle any errors that occur during the search request
//     console.error('Error searching for movie');
//   });
// });
