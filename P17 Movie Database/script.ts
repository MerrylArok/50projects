const apiURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=31b3c9bc839b104adb93bdc06fda2866&page=1';
const imagePath = 'https://image.tmdb.org/t/p/w1280';
const searchURL = 'https://api.themoviedb.org/3/search/movie?api_key=31b3c9bc839b104adb93bdc06fda2866&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }

}


function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
                            <img src="${imagePath + poster_path}" alt="${title} image unavailable">
                            <div class="movie-info">
                             <h3>${title}</h3>
                             <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                             </div>
                             <div class="overview">
                                 <h3>Overview</h3>${overview}</div>
                            </div>`;

        main.appendChild(movieEl);

    })
}

getMovies(apiURL);



form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(searchURL + searchTerm);

        search.value = '';
    } else {
        window.location.reload();
    }
})