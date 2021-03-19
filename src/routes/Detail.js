import React from "react";
import "./Detail.css";


function Detail({location, history}){
    if(location.state === undefined){// 클릭하지 않고 페이지를 열면 데이터가 없어서 바로 디테일 페이지로 갈경우
        history.push("/");// 메인페이지로 이동시킴
    }
    if(location.state){// 이렇게 하는 이유는 주소창을 한번더 검색하면 location이 존재하지 않기 때문에 에러 발생을 방지 
        let genre = location.state.genres;
        let summary=location.state.summary;
        let image =location.state.medium_cover_image;
        let rating=location.state.rating;
        let year=location.state.year;
        let runtime= location.state.runtime;
      return (
        <div className="movie_data">
            <img src={image}></img>
            <div className="movie_data_info">
                <h3 className="movie_data_title">{location.state.title}</h3>
                <div className="data_box"> 
                    <ul>  
                        장르
                        {genre.map((genre, index)=>(
                            <li key={index}> - {" " +genre}</li>
                        ))}
                    </ul>
                    <ul>
                        <li>개봉 : {year} 년</li>
                        <li>평점 : {rating}</li>
                        <li>{runtime}분</li>
                      
                    </ul>
           
                    
                </div>
                줄거리
                <div className="movie_data_summary">{summary}</div>
            </div>
        </div>
            );
    } else{
        return null;
    }
}

export default Detail;