import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";
import { Link } from "react-router-dom";
let rank = 0; //평점순위

function Movie({id, year, title, summary, medium_cover_image,  genres, rating, runtime}){
    rank = rank+1; //평점순위 증가
    if(rank>20){ //폄점순위를 20위 까지만 보여줌
        rank=1; //더이상 순위증가를 막기위한 초기화
    } 

    let _title=title; //영화 제목
    if(_title.length >24){ //영화 제목이 24글자가 넘으면
        _title = <span>{title.slice(0,24)}...</span> //24글자 뒤에는 ... 으로 표시
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
                <div className="movie_rank">{rank}</div> {/*영화 평점순위*/}
                <img src={medium_cover_image} alt={title} title={title}></img>  {/*영화 포스터*/}
            </Link> {/*클릭시 영화정보 컴포넌트로 이동하면서 영화정보를 전달*/}
                <div className="movie_main_title"> {/*간단한 영화 정보, 제목, 평점, 개봉일*/}        
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
    medium_cover_image: PropTypes.string.isRequired,
    large_cover_image: PropTypes.string.isRequired,
    rating:PropTypes.number.isRequired,
    runtime:PropTypes.number.isRequired
};

export default Movie;