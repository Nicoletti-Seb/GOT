/**
	@author Sébastien Nicoletti
*/

document.addEventListener("DOMContentLoaded", function(event) { 

	//Associate event with html elements
	document.querySelector("#refresh-episodes").onclick = update;
	
	// update the page
	update();
});

var dataLikeElement = null;

/**
	Function "init"

	Generate the html code to display episodes.
*/
var update =  function (){
	var xhr = new XMLHttpRequest();

	/*
		Add a random param allow to force the browser to not used the cache
		(Problem find with IE 11 )
	 */
	xhr.open("GET", "/episodes/?nocache=" + Math.random(), true);

	xhr.onload = function (e) {
	  if ( xhr.readyState == 4 && xhr.status == 200 ){

	  	if( dataLikeElement == null ){ // First time 
	  		dataLikeElement = [];
	    	build( JSON.parse(xhr.responseText) );
	  	}
	  	else{
	  		refreshLike( JSON.parse(xhr.responseText) );
	  	}

	  }
	};

	xhr.onerror = onError;
	xhr.send(null);
}

/**
	Function "build"

	Build the html code to display episodes.
*/
var build = function (data){
	var elemEpisodes = document.querySelector(".episodes");

	//clean the element before update
	elemEpisodes.innerHTML = "";

	//update
	for( var i in data ){
		var episode = data[i];
		elemEpisodes.appendChild( buildElemEpisode(episode) );
		elemEpisodes.appendChild( document.createElement("hr") );
	}
}

/**
	Function "buildElemEpisode"

	Build the html code to display an episode.
*/
var buildElemEpisode = function( episode ){
	var article = document.createElement("article");
	article.className += "episode";
	article.appendChild( buildEpisodeDesc(episode) );
	article.appendChild( buildEpisodeLike(episode) );

	return article;
}

/**
	Function "buildEpisodeDesc"

	Build the html code to display the description of an episode.
*/
var buildEpisodeDesc = function (episode){
	var div = document.createElement("div");
	div.className = "episode_desc";

	//Title
	div.innerHTML += episode.title;

	//Time
	var span = document.createElement("span");
	span.className += "episode_desc_time";
	span.innerHTML += convertTimeSecToMinSec(episode.duration);
	div.appendChild( span );

	return div;
}

/**
	Function "buildEpisodeDesc"

	Build the html code to display "likes" of an episode.
*/
var buildEpisodeLike = function (episode){
	var divEpisodeLike = document.createElement("div");
	divEpisodeLike.className += "episode_like";
	
	//number of like
	var numberLike = document.createElement("span");
	numberLike.innerHTML += episode.like;
	divEpisodeLike.appendChild(numberLike)


	//logo like
	var containerLike = document.createElement("div");
	containerLike.className += "container-like";
	divEpisodeLike.appendChild(containerLike)

	var logo = document.createElement("div");
	logo.className += "like";
	containerLike.appendChild(logo);

	//Add click event to like an episode
	containerLike.onclick = function(){
		like(episode.id);

		//remove the listener after a click
		containerLike.onclick = null;
	};

	//save like element
	dataLikeElement[ episode.id ] = numberLike;

	return divEpisodeLike;
}

/**
	function "refresh"

	Update likes of episodes
*/
var refreshLike = function (episodes){
	for( var i in episodes ){
		var episode = episodes[i];
		var element = dataLikeElement[episode.id];
		element.innerHTML = episode.like;
	}
}

/**
	Function "like"

	Increment the like numbers of an episode.
*/
var like = function (idEpisode){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/like", true);
	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

	xhr.onload = function (e) {
	  if ( xhr.readyState == 4 && xhr.status == 200 ){
	      var res = JSON.parse(xhr.responseText);
		  
		  if( res.result == true ){
		  	onLike(idEpisode);
		  }
		  else{
		  	onError("Error: like result = false");
		  }
	  }
	};

	xhr.onerror = onError;
	xhr.send( JSON.stringify( { id: idEpisode} ) );
}

/**
	Function "onLike"

	The function is called after the function "like".
	Update the html code.
*/
var onLike = function ( idEpisode ){
	var element = dataLikeElement[idEpisode];
	element.innerHTML = parseInt(element.innerHTML) + 1;
}

/**
	Function "onError"

	The function is called if error.
*/
var onError = function (e){
	console.error(e);
}

/**
	Function "convertTimeSecToMinSec"

	Convert the number of second in minutes and seconds 
*/
function convertTimeSecToMinSec(sec){
	return Math.floor(sec/60) + "min " + sec%60 + " sec";
}