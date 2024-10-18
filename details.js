const param = new URLSearchParams(window.location.search);
const id = param.get('id');
console.log(id);

const API_KEY = "28961767db8e2699b29aa3a5c7a38c4b";
const API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;

async function fetchMovieDetails() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const movie = await response.json();
        console.log(movie);
        displayMovieDetails(movie);
    } catch (error) {
        console.error('Error fetching movie details:', error);
        document.getElementById('movie-details').innerHTML = `<p class="text-red-500">Failed to load movie details.</p>`;
    }
}


function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById('movie-details');
    movieDetailsContainer.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">${movie.title}</h2>
        <img class="w-full h-auto mb-4 rounded" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        <p class="mb-4">${movie.overview}</p>
        <p class="mb-4">Release Date: ${movie.release_date}</p>
        <p class="mb-4">Rating: ${movie.vote_average}/10</p>
        <a href="index.html" class="text-blue-400 hover:underline">Back to list</a>
    `;
}


if (id) {
    fetchMovieDetails();
} else {
    console.error('No movie ID found in URL');
    document.getElementById('movie-details').innerHTML = `<p class="text-red-500">No movie selected.</p>`;
}