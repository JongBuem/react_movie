import React from "react";
import Boxoffice from "../component/Boxoffice";
import "./Moviechart.css";
import { Link } from "react-router-dom";
let array = [];

function replace(movie) {
  for(let i=0; i<4; i++){
    array[i] = movie[i];
  }
  return array;
}

function Home(data){
  const movies = data.movies;
  let loading = data.loading; 
  const movie = movies.map(movie=>(
    <Boxoffice 
    key={movie.id}
    id={movie.id} 
    year={movie.year} 
    title={movie.title} 
    summary={movie.summary} 
    small_cover_image={movie.small_cover_image}
    medium_cover_image={movie.medium_cover_image}
    large_cover_image={movie.large_cover_image}
    genres={movie.genres}
    rating={movie.rating}
    runtime={movie.runtime}
  />)); 
  replace(movie);
  
  return(
    <section className="App">
        {loading ? 
          ( <div className="loading"> <span className="loading_text">Loading...</span> </div> 
          ) : 
          ( <div className="movies home">
             
                <h4 className="home_menu_title">박스오피스</h4>
                <Link to="/movie" className="addmovie">더 많은 영화보기 +</Link>
         
              {array}
            </div> )
        }
    </section>
  );
}

export default Home;