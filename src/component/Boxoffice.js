import React from "react";
import PropTypes from "prop-types";
import "./Boxoffice.css";
import { Link } from "react-router-dom";
let rank = 0;

function Boxoffice({id, year, title, summary, small_cover_image, medium_cover_image, large_cover_image, genres, rating, runtime}){
    rank = rank+1;
    if(rank>4){
        rank=1;
    } 

    return (
        <div className="Boxoffice">
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
            <div className="Boxoffice_menu">
                <div className="good">
                    <i class="far fa-heart"> {id}</i>
                </div>
                <Link to="/ticketing">예매</Link>
            </div>
        </div>          
    );
    
}

Boxoffice.propTypes = {
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    medium_cover_image: PropTypes.string.isRequired,
    large_cover_image: PropTypes.string.isRequired,
    rating:PropTypes.number.isRequired,
    runtime:PropTypes.number.isRequired
};

export default Boxoffice;