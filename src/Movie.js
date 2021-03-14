import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";

function Movie({year, title, summary, small_cover_image, medium_cover_image, large_cover_image, genres}){
    return (
        <div className="movie">
            <img src={medium_cover_image} alt={title} title={title}/>
            <div className="movie__data">
                <h3 className="movie__title">{title}</h3>
                <h5 className="movie__year">개봉일 : {year}</h5>
                <ul className="genres">
                    {genres.map((genre, index)=>(
                        <li className="genres__genre" key={index}>{genre}</li>
                    ))}
                </ul>
                <p className="movie_summary">{summary.slice(0,100)}...</p>
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