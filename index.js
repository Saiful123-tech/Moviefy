
const apikey = "116b9f86f88433d49404aaa1e0c602ac";
const apiEndpoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original";
const apipath = {
    fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMoviesList: (id) => `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending:`${apiEndpoint}/trending/all/day?api_key=${apikey}&language=en-US`,
    SearchYoutube: (query) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyDvTYYFRaAPF5t3KGZacG6gwALZZBDux30`,
    tvShows: `${apiEndpoint}/tv/top_rated?api_key=${apikey}`,
    MovieReview: (MovieId) => `${apiEndpoint}/movie/${MovieId}/reviews?api_key=${apikey}`
}

// async function init(){
// //   await fetch(apipath.fetchAllCategories,{
// //         method: 'GET',
// //         mode: 'no-cors',
// //         headers: {
// //            'Access-Control-Allow-Origin' : '*'
// //         },
// //     })
// //     .then(res => console.log(res.json()))
// //     .catch(err => console.error(1))
// const response = await fetch(apipath.fetchAllCategories,{
//              method: 'GET',
//             mode: 'no-cors',
//              headers: {
//               'Access-Control-Allow-Origin' : '*'
//              },
//          });
   
//     // Storing data in form of JSON
//     var data = await response.json();
//     console.log(data);
// }

function init(){
    fetchAndBuildAllSections();
}

function fetchAndBuildAllSections(){
    fetch(apipath.fetchAllCategories)
    .then(res => res.json())
    .then(res => {
        const categories = res.genres;
        if(Array.isArray(categories) && categories.length){
            categories.forEach(category =>{
               fetchAndBuildMovieSection(category)
               
            });
        }
        //  
})   
        .catch(err => console.error(err));
}

function fetchAndBuildMovieSection(category){
    // console.log(category.id)
    Movies(apipath.fetchMoviesList(category.id),category)
}

function Movies(MoviesApi,category){
    fetch(MoviesApi)
    .then(res => res.json())
    .then(res =>{
        let movies = res.results;
      if(Array.isArray(movies) && movies.length){
        // console.log(movies)
        // const element = document.querySelector('.row-container')
        // console.log(element)
        buildMoviesSection(movies,category.name)
      }
    })
    .catch( err => console.error(err))
}

function buildMoviesSection(list,categoryName){
    // console.log(list,categoryName)
    const moviesCont = document.getElementById('movies-cont');
    // console.log(moviesCont)
   const movieListHtml = list.map( item =>{
       return `
       <img src="${imgPath}${item.backdrop_path}" alt="${item.item}" srcset="" onClick="OpneModel('${item.id}','${item.title}')">   `
    }).join(' ');
    // console.log(movieListHtml)
    const moviesSectionHTML = `

<h1>${categoryName}</h1>
<div class="item">
  ${movieListHtml}
   </div>

`
const div = document.createElement('div');
div.className = "row-container"
div.innerHTML = moviesSectionHTML;
// appent html to container
moviesCont.append(div);
}


window.addEventListener('load',function(){
    init();
    fetchtrendingMovies(apipath.fetchTrending,"Trending");
    fetchTvShows(apipath.tvShows,'Tv Shows');
})


function fetchtrendingMovies(fetchUrl,categoryName){
    fetch(fetchUrl)
    .then(res => res.json())
    .then(res => {
        let trendingMovies = res.results;
        if(Array.isArray(trendingMovies) && trendingMovies.length){
            Setbanner(trendingMovies);
            fetchbuildtrendMovies(trendingMovies,categoryName)
        }
        
    })
    .catch(err => console.log(err))
}

function fetchbuildtrendMovies(trendingMovies,categoryName){
        console.log(trendingMovies)
       const trendingCont = document.getElementById('trending-cont')
    //    console.log(trendingCont);
       const trendingListHtml = trendingMovies.map(item => {
        return `
          <img src="${imgPath}${item.backdrop_path}" alt="" srcset="" onClick="OpneModel('${item.id}','${item.title}')"> `
       }).join(' ');
    //  console.log(trendingListHtml)
     const trendingMoviesSectionHtml = `
     <h1 style="color:white">${categoryName}</h1>
    
     <div class="item-trending">
       ${trendingListHtml}
        </div>
     `
     const div =  document.createElement('div');
     div.className = 'movies-trending'
     div.innerHTML = trendingMoviesSectionHtml;
     trendingCont.append(div);
}

function Setbanner(trendingMovies){
    const randomNumber =  Math.floor(Math.random() * (trendingMovies.length - 0 + 1) + 0);
    console.log(trendingMovies[randomNumber])
    console.log(trendingMovies)
    const banner = document.getElementById('banner')
    const bannerContentHtml = `
    <h1 class="banner-heading">${trendingMovies[randomNumber].title}</h1>
    <h3 class="banner-release">Release Date | ${trendingMovies[randomNumber].release_date}</h3>
    <div class="banner-button">
        <button type="button" class="btn-primary"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg> &nbsp;&nbsp; Play</button>
        <button type="button" class="btn-secondary"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg> &nbsp;&nbsp; More Info</button>
    </div>
   
    `
    const bannerdiv = document.createElement('div');
    bannerdiv.className = 'banner-content';
    bannerdiv.innerHTML = bannerContentHtml;
    const bannersectiondiv = document.createElement('div');
    bannersectiondiv.className = 'banner-section'
    bannersectiondiv.style.backgroundImage = `url(${imgPath}${trendingMovies[randomNumber].backdrop_path})`
    bannersectiondiv.append(bannerdiv)
    
    banner.append(bannersectiondiv);
}
// {/* <div class="banner-section" id="banner" style="background-image: url('https://image.tmdb.org/t/p/original/xGIeqQunSj5dxGZVKzNNr9W4vps.jpg');">
// <div class="banner-content">
//     <h1 class="banner-heading">Bloody Daddy</h1>
//     <h3 class="banner-release">Release Date |  fjfkfkf</h3>
 // <p class="description">${trendingMovies[randomNumber].overview}</p>
//     <p class="description"> vfkvmkfvmkfvmfkvmfkvmflvmsdkvmdkvmkdvmdkfmdvmkdvmdkvmfkfvs</p>
//     </div>
   

// </div> */}




function OpneModel(MovieId,MovieName){
    console.log(MovieId,MovieName)
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
      }
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    fetch(apipath.MovieReview(MovieId))
    .then(res => res.json())
    .then(res =>{
          console.log(res)
   
    
        let output = res.results[0];
        console.log(output.author_details)
        document.querySelector('.movie-name').innerHTML = MovieName
        document.querySelector('.rating').innerHTML =  output.author_details.rating;
        document.querySelector('.description').innerHTML = output.content;
        const element = document.getElementById("btn");
        element.addEventListener('click',function(){
            console.log("button Clicked")
            SearchMovieTrailor(MovieName)
        })
        const watchlist = document.getElementById("watchlist_button");
        watchlist.addEventListener('click',function(){
            console.log("Watch List")
            addwatchListMovie(MovieId,MovieName)
        })
    })
   
    
}

function addwatchListMovie(MovieId,MovieName){
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: MovieName,
          body: 'Movie',
          userId: MovieId
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
      

        fetch(`https://jsonplaceholder.typicode.com/posts/${MovieId}`)
  .then((response) => response.json())
  .then((json) => console.log(json));

    // const updatedMovies =  RemoveWatchList(MovieName,movies);
}

function RemoveWatchList(MovieName,movies){
    let index;
   for(let i=0;i<movies.length;i++){
    if(movies[i]===MovieName){
        index=MovieName
    }
   }
     movies.splice(index,1);
     return movies;

}

function SearchMovieTrailor(MovieName){
    console.log(MovieName)
    if(!MovieName){
        return;
    }
    fetch(apipath.SearchYoutube(MovieName))
    .then(res => res.json())
    .then(res => {
        const bestResults = res.items[0];
        console.log(bestResults);
        const youtubeUrl = `https://www.youtube.com/watch?v=${bestResults.id.videoId}`
        console.log(youtubeUrl);
        window.open(youtubeUrl); 
    })
}


function fetchTvShows(baseUrl,name){
    fetch(baseUrl)
    .then(res => res.json())
    .then(res =>{
         console.log(1)
         console.log(res.results)
        const Showsresult = res.results;
        const tvcont = document.getElementById('tv-cont');
        const tvShowsListHtml = Showsresult.map(item => {
            return `
              <img src="${imgPath}${item.backdrop_path}" alt="" srcset="" onClick="OpneModel('${item.id}','${item.name}')"> `
           }).join(' ');
           const tvshowsSectionHtml = `
           <h1 style="color:white">${name}</h1>
          
           <div class="item-tv">
             ${tvShowsListHtml}
              </div>
           `
           const tvdiv = document.createElement('div');
           tvdiv.className = 'tv-trending';
           tvdiv.innerHTML = tvshowsSectionHtml;
              tvcont.append(tvdiv);
    })
}


function OpneModelforMood(SerialId,SerialName){
    
}
