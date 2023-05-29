const global = {
    currentPage: window.location.pathname
}

// display 20 most popular movies
async function displayPopularMovies(){
    const {results} = await fetchAPIData('movie/popular');
    // console.log(results)
    results.forEach(movie =>{
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href="movie-details.html?${movie.id}">
          ${movie.poster_path ? `<img
          src="https:tmdb.org/t/p/w500${movie.poster_path}"
          class="card-img-top"
          alt="Movie Title"
        />` 
        : `<img
        src="../images/no-image.jpg"
        class="card-img-top"
        alt="${movie.title}"
      />`}
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>`
        document.querySelector('#popular-movies').appendChild(div)
    })
}



// display 20 most popular tv shows
async function displayPopularShows(){
    const {results} = await fetchAPIData('tv/popular');
    // console.log(results)
    results.forEach(show =>{
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href="show-details.html?${show.id}">
          ${show.poster_path ? `<img
          src="https:tmdb.org/t/p/w500${show.poster_path}"
          class="card-img-top"
          alt="${show.name}"
        />` 
        : `<img
        src="../images/no-image.jpg"
        class="card-img-top"
        alt="${show.title}"
      />`}
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.title}</h5>
          <p class="card-text">
            <small class="text-muted">Air Date: ${show.first_air_date}</small>
          </p>
        </div>`
        document.querySelector('#popular-shows').appendChild(div)
    })
}

// Fetch data from TMDB Api
async function fetchAPIData (endpoint){
    const API_Key = '080357793d303a0813934d3dbaedbdbb';
    const API_URL = 'https://api.themoviedb.org/3';

    showSpinner();
    const response = await fetch(`${API_URL}/${endpoint}?api_key=${API_Key}&language=en-US`)

    const data = await response.json();
    hideSpinner();
    return data;
}

function showSpinner(){
    document.querySelector('.spinner').classList.add('show')
}
function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show')
}

// Highlight Active Link
function highlightActiveLink(){
    const links =document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active')
        }
    })
}

// init App
function init(){
    switch(global.currentPage){
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/shows.html':
            displayPopularShows();
            break;
        case '/movie-details.html':
            console.log('Movie Details');
            break;
        case '/tv-details.html':
            console.log('TV Details');
            break;
        case '/search.html':
            console.log('Search');
            break;
    }
    highlightActiveLink()
}
document.addEventListener('DOMContentLoaded', init)