let leftMenu = $(".leftMenu") ;
let rightMenu = $(".rightMenu") ;
let navControl = $("#navControl") ;

let width = leftMenu.outerWidth();

navControl.click(function () { 

    if(navControl.attr("class")=="open"){
        navControl.addClass("close").removeClass("open");
        leftMenu.animate({ "left":`-${width}` },700);
        rightMenu.animate({"left":"0px"},690);

        
    }
    else{
        navControl.addClass("open").removeClass("close");
        leftMenu.animate({"left":"0px"},700);
        rightMenu.animate({"left": `${width}` },700);
    }

});


// movies

let moviesContent = document.getElementById("moviesContent");
let allMovies = [];
function getMovies(){
    let http = new XMLHttpRequest();

    http.open("GET" , "https://api.themoviedb.org/3/trending/all/day?api_key=0751a6b8887984b99bc3f7291abf0a37");
    http.send();
    http.onreadystatechange=function(){
        if(http.readyState==4 && http.status==200 ){
            allMovies= JSON.parse(http.response).results ;
            displayData();
        }
    }
}

let imgPath="https://image.tmdb.org/t/p/w500" ;

function displayData()
{
    let temp="";
    for(let i=0;i<allMovies.length;i++)
    {
        temp+=`<div class="col-md-4 mb-4">
        <div class="movie-item">
            <img src="${imgPath+allMovies[i].poster_path}" class="w-100">
            <div class="layer">
                <h3>${allMovies[i].title}</h3>
                <p>${allMovies[i].overview}</p>
                <p>Rate${allMovies[i].vote_average}</p>
                <p>${allMovies[i].release_date}</p>
            </div>
        </div>
    </div>`
    }
    moviesContent.innerHTML=temp;
}



let search = document.getElementById("search");
let searchResult = document.getElementById("searchResult");

// function search
search.onkeyup=function(){

    let word=search.value;
    searchMovies(word);

}


function searchMovies(word)
{
    console.log (allMovies)
    if(word == "")
    {
        return false ;
    }
    
    let content="";

    for(let i=0;i<allMovies.length;i++)
    {
        if(`${allMovies[i].title}`.toLowerCase().includes(word.toLowerCase())===true){
        content+=`<div class="col-md-4 mb-4">
        <div class="movie-item">
            <img src="${imgPath+allMovies[i].poster_path}" class="w-100">
            <div class="layer">
                <h3>${allMovies[i].title}</h3>
                <p>${allMovies[i].overview}</p>
                <p>Rate${allMovies[i].vote_average}</p>
                <p>${allMovies[i].release_date}</p>
            </div>
        </div>
        </div>`
        }
    }
    searchResult.innerHTML = content;
}
    








getMovies();
