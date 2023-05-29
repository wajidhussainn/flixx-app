const global = {
    currentPage: window.location.pathname
}

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

// Fetch data from TMDB Api
async function fetchAPIData (endpoint){
    const API_Key = '080357793d303a0813934d3dbaedbdbb';
    const API_URL = 'https://api.themoviedb.org/3';

    const response = await fetch(`${API_URL}/${endpoint}?api_key=${API_Key}&language=en-US`)

    const data = await response.json();
    return data;
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
            displayPopularMovies()
            break;
        case '/shows.html':
            console.log('Shows');
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