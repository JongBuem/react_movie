import React from "react";
import PropTypes from "prop-types";
import "./Boxoffice.css";
import { Link } from "react-router-dom";
let rank = 0; //평점순위

function Boxoffice({id, year, title, summary, medium_cover_image, genres, rating, runtime, count}){
    rank = rank+1; //평점순위 증가
    if(rank>count){ //폄점순위를 4위까지만 보여줌
        rank=1; //더이상 순위증가를 막기위한 초기화
    } 

    return (
        <div className="Boxoffice" id={rank}>
            
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
                <div className="movie_rank">{rank}</div>  {/*영화 평점순위*/}
                <img src={medium_cover_image} alt={title} title={title}></img> {/*영화 포스터*/}
            </Link> {/*클릭시 영화정보 컴포넌트로 이동하면서 영화정보를 전달*/}
            <div className="Boxoffice_menu">
                <div className="good">
                    <i className="far fa-heart"> {id}</i> {/*영화 좋아요 갯수를 id로 임시 출력*/}
                </div>
                <Link to="/ticketing">예매</Link> {/*클릭시 예매 컴포넌트로 이동*/}
                
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