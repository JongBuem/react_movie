import React from "react";
import "./Detail.css";


function Detail({location, history}){ //영화정보와 페이지 history를 인자로 가져옴
    if(location.state === undefined){ //영화포스터를 클릭하지 않고 해당주소로 이동할때
        history.push("/"); //메인페이지로 이동시킴, 전달받은 영화정보가 없기 때문
    }
    if(location.state){ //영화정보가 전달 됬다면
        let title = location.state.title; //영화 제목
        let genre = location.state.genres; //영화 장르
        let summary=location.state.summary; //영화 줄거리
        let image =location.state.medium_cover_image; //영화 포스터
        let rating=location.state.rating; //영화평점
        let year=location.state.year; //영화 개봉시기
        let runtime= location.state.runtime; //영화 상영시간


      return (
       <div className="detail">
            <div className="movie_data">
                <img src={image}></img>
                <div className="movie_data_info">
                    <h3 className="movie_data_title">{title}</h3>
                    <div className="data_box"> 
                        <ul>  
                            <b>장르</b>
                            {genre.map((genre, index)=>(
                                <li key={index}> - {" " +genre}</li>
                            ))}
                        </ul>
                        <ul>
                            <li><b>개봉 : </b>{year}년</li>
                            <li><b>평점 : </b>  
                                <span class='RatingStar'>
                                    <span class='RatingScore'>
                                        <span class='outer-star'>
                                            <span class='inner-star' style={{width: rating*10+"%"}}/>
                                        </span>
                                    </span>
                                    {rating}
                                </span>
                            </li>
                            <li><b>상영 시간 :</b> {runtime}분</li>
                        </ul>
                    </div>
                    <b>줄거리</b>
                    <div className="movie_data_summary">{summary}</div>
                </div>
            </div>
       </div>
            );
    } else{
        return null; // 영화정보가 전달 되지 않을때 에러 발생을 방지
    }
}

export default Detail;