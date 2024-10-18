function loadWatchlist() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const watchlistContainer = document.getElementById("watchlist");

  if (watchlist.length === 0) {
    watchlistContainer.innerHTML =
      '<p class="text-center">Your watchlist is empty!</p>';
    return;
  }

  watchlistContainer.innerHTML = watchlist
    .map((movie) => {
      return `
            <div class="p-5 bg-gray-800 rounded-lg shadow-lg">
                <h2 class="text-lg font-bold mb-2">${movie.title}</h2> 
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="rounded mb-2"/>
                <p class="text-sm overflow-hidden mb-2">${movie.overview}</p>
                <div class="flex justify-between items-center">
                    <button class="bg-red-500 text-white py-1 px-2 rounded" onclick="removeFromWatchlist(${movie.id})">Remove</button>
                </div>
            </div>
        `;
    })
    .join("");
}


function removeFromWatchlist(id) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  watchlist = watchlist.filter((movie) => movie.id !== id);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  loadWatchlist();
}

document.addEventListener("DOMContentLoaded", loadWatchlist);
