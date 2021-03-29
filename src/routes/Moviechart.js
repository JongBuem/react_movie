import React from "react";
import Movie from "../component/Movie";
import "./Moviechart.css";

function Moviechart(data){ //라우터에서 전달한 props를 인자로 받아옴
  const movies = data.movies; //영화정보 변수
  let loading = data.loading; //로딩상황 변수

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
