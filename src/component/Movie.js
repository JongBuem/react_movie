import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";
import { Link } from "react-router-dom";
let rank = 0;
let _title=null;


function Movie({id, year, title, summary, small_cover_image, medium_cover_image, large_cover_image, genres, rating, runtime}){
    rank = rank+1;
    if(rank>20){
        rank=1;
    } 

    if(title.length >23){
        _title = <span>{title.slice(0,23)}...</span> 
    }

    return (
        <div className="movie">
            <Link to={{
                pathname:`/movie/${id}`,
                state:{
                    year:year,
                    title:title,
                    summary:summary,
                    medium_cover_image:medium_cover_image,
                    genres:genres,
                    rating:rating,
                    runtime:runtime
                }}} className="movie_link">
                <div className="movie_rank">{rank}</div>
                <img src={medium_cover_image} alt={title} title={title}></img>
            </Link>
                <div className="movie_main_title">               
                    <h1 className="movie_title">{_title}</h1>
                    <h5 className="movie_rating_year">평점:{rating}점 | 개봉일 : {year}</h5>
                </div>  
        </div>          
    );
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    small_cover_image: PropTypes.string.isRequired,
    medium_cover_image: PropTypes.string.isRequired,
    large_cover_image: PropTypes.string.isRequired
};

export default Movie;