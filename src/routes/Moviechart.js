import React from "react";
import Movie from "../component/Movie";
import "./Moviechart.css";

function Moviechart(data){
  const movies = data.movies;
  let loading = data.loading; 

  return(
    <section className="App">
        {loading ? 
          (
            <div className="loading">
              <span className="loading_text">Loading...</span>
            </div> 
          ) : 
          (
            <div className="movies">
              {
              movies.map(movie=>(
                <Movie 
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
              />)) 
              }
            </div>
          )}

    </section>
  );
}

export default Moviechart;
