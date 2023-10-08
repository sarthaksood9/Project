document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const movieResults = document.getElementById("movieResults");
  movieResults.style.display = "flex";
  movieResults.style.flexWrap = "wrap";

  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();

    if (searchTerm !== "") {
      fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=2b74bea7`)
        .then((response) => response.json())
        .then((data) => {
          if (data.Search) {
            displayMovies(data.Search);
          } else {
            movieResults.innerHTML = "<p>No results found.</p>";
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          movieResults.innerHTML =
            "<p>An error occurred while fetching data.</p>";
        });
    }
  });

  function displayMovies(movies) {
    movieResults.innerHTML = "";

    for (let i = 0; i < movies.length; i += 4) {
      const movieGroup = document.createElement("div");
      movieGroup.classList.add("movie-group");
    

      for (let j = i; j < i + 4 && j < movies.length; j++) {
        const movie = movies[j];
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        // movieDiv.style.border = "1px solid #007bff";
        // movieDiv.style.padding = "10px";
        // movieDiv.style.height = "100%";
        // movieDiv.style.marginBottom = "30px";
        // movieDiv.style.backgroundColor = "#f7d916c6";
        // movieDiv.style.textAlign = "center";
        // movieDiv.style.width = "100%";
        // movieDiv.style.boxSizing = "border-box";
        // movieDiv.style.display = "flex";
        // movieDiv.style.flexDirection = "column";
        // movieDiv.style.alignItems = "center";
        // movieDiv.style.transform = "scale(1.1)";
        // movieDiv.style.height = "400px";

        movieDiv.innerHTML = `
  <div class="movie-inner">
    <div >
      <img src="${movie.Poster}" alt="${movie.Title}" style="max-height: 60%; max-width: 60%; object-fit: contain;">
    </div>
    <h2>${movie.Title}</h2>
    <p>Release Date: ${movie.Year}</p>
    <p>Type: ${movie.Type}</p>
  </div>
`;
        movieGroup.appendChild(movieDiv);
      }

      movieResults.appendChild(movieGroup);
    }
  }
});
