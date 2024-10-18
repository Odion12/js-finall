const API_KEY = "28961767db8e2699b29aa3a5c7a38c4b";
const API_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;


async function fetchTrendingMovies() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data.results);
    const movies = data.results;
    displayMovies(movies);
  } catch (error) {
    console.error("Error fetching trending movies", error);
  }
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById("movies");
  moviesContainer.innerHTML = movies
    .map((movie) => {
      return `
            <div class="p-5 bg-gray-800 rounded-lg shadow-lg mb-6 ml-2 mr-3">
                <h2 class="text-lg font-bold mb-2">${movie.title}</h2> 
                <img src="https://image.tmdb.org/t/p/w500${
                  movie.poster_path
                }" alt="${movie.title}" class="rounded mb-2"/>
                <p class="text-sm overflow-hidden mb-2">${movie.overview}</p>
                <p class="text-xs text-gray-400">${
                  movie.media_type || "Movie"
                }</p>
                <div class="flex justify-between items-center">
                    <a href="details.html?id=${
                      movie.id
                    }" class="text-blue-400 hover:underline">See more</a>
                    <button class="bg-amber-500 text-white py-1 px-2 rounded" onclick="addToWatchlist(${
                      movie.id
                    }, '${movie.title}', '${movie.poster_path}', '${
        movie.overview
      }')">Add to Watchlist</button>
                </div>
            </div>
        `;
    })
    .join("");
}

function addToWatchlist(id, title, poster_path, overview) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  
  if (!watchlist.some((movie) => movie.id === id)) {
    const movie = { id, title, poster_path, overview };
    watchlist.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert(`${title} has been added to your watchlist.`);
  } else {
    alert("Movie is already in your watchlist.");
  }
}


async function searchMovies(query) {
  try {
    const response = await fetch(`${SEARCH_URL}${encodeURIComponent(query)}`);
    const data = await response.json();
    console.log(data.results);
    const movies = data.results;
    displayMovies(movies);
  } catch (error) {
    console.error("Error fetching search results", error);
  }
}


document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const query = document.getElementById("search-input").value;
    if (query) {
      searchMovies(query);
    }
  });


fetchTrendingMovies();
