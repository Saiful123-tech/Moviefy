const apikey = "116b9f86f88433d49404aaa1e0c602ac";
const apiEndpoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original";
const apipath = {
    fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMoviesList: (id) => `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
}
let form = document.getElementById("myForm");
form.addEventListener('submit',function(e){
    // window.location.reload();
    
  e.preventDefault();
  console.log(form[0].value)
  GetMovies(form[0].value)
})
function GetMovies(category){
    let ans= category
    let id;
     let categoriesMovies = ans === 'Serious Movies' ? 'Mystery' : ans === 'Angry Movies' ? 'Thriller' : ans === 'Happy Movies' ? 'Comedy' : ans === 'Romantic Movies' ? 'Romantic'
     : ans  === 'Excitement Movies' ? 'Science Fiction'  :  'Adventure'
     console.log(categoriesMovies);
     fetch(apipath.fetchAllCategories)
     .then(res => res.json())
     .then(res => {
        console.log(res.genres)
        let array = res.genres
      for(let i=0;i<array.length;i++){
        if(array[i].name===categoriesMovies){
            id=array[i].id;
           
        }
      }

      fetchCategoriesMovies(id,categoriesMovies);
})
}
function fetchCategoriesMovies(id,categoriesMovies){
    fetch(apipath.fetchMoviesList(id))
    .then(res => res.json())
    .then(res => {
        console.log(res.results);
        let list=res.results;
        const categorycont = document.getElementById('category-cont');
     const movieListHtml = list.map(item =>{
        return `
        <img src="${imgPath}${item.backdrop_path}" alt="" srcset="">   
        `
     }).join(' ');
     console.log(movieListHtml);
     const moviesSectionHtml =
     `
     <h1 style="color:white">${categoriesMovies}</h1>
       
     <div class="item-category">
       ${movieListHtml}
        </div>
     `
     const div = document.createElement('div');
     div.className='movies-category';
     div.innerHTML = moviesSectionHtml;
     categorycont.append(div)
      
    })
}