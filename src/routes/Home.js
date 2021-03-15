import React from "react";
import axios from "axios";
import Movie from "../component/Movie";
import "./Home.css";

class Home extends React.Component {
 state = {
   Loading:true,
   Movies:[]
 };

getMovies = async()=>{
  const {data:{data:{movies}}}= await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
  this.setState({
    Movies:movies,
    Loading:false
  })
}

  componentDidMount(){
   this.getMovies();
  }

  render(){
    const {Loading, Movies} = this.state;
    return(
      <section className="App">

        {Loading ? 
          (
            <div className="loading">
              <span className="loading_text">Loading...</span>
            </div> 
          ) : 
          (
            <div className="movies">
              {
              Movies.map(movie=>(
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
              />)) 
              }
            </div>
          )}

    </section>
    );
  }
}

export default Home;
