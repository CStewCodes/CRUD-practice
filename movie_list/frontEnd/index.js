const movieList = "http://localhost:3001/movies";
// fetch(movieList)
  .then((response) => response.json())
  .then((result) => console.log(result));

const textInput = document.querySelector("#text-search");
const searchButton = document.querySelector("#search-button");

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

// Add an event listener to the search form
searchButton.addEventListener('click', () => {
  // Get the search term from the input field
  const searchTerm = $('#text-search').val();

  // Send an AJAX request to the server to search for the movie
  $.get(`http://localhost:3001/movies/search?term=${searchTerm}`, function(movie) {
    // Create a card element and populate it with the movie data
    const card = $('<div>').addClass('card');
    const cardBody = $('<div>').addClass('card-body');
    const title = $('<h5>').addClass('card-title').text(movie.movie_name);
    const releaseDate = $('<p>').addClass('card-text').text(`Released on: ${movie.released_date}`);
    const runTime = $('<p>').addClass('card-text').text(`Run time: ${movie.run_time} minutes`);
    const rating = $('<p>').addClass('card-text').text(`Rating: ${movie.rating}/5`);

    cardBody.append(title, releaseDate, runTime, rating);
    card.append(cardBody);

    // Append the card to the page
    $('#movie-card').empty().append(card);
  }).fail(function() {
    // Handle any errors that occur during the search request
    console.error('Error searching for movie');
  });
});