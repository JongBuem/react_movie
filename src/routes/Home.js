import React from "react";
import Boxoffice from "../component/Boxoffice";
import "./Moviechart.css";
import { Link } from "react-router-dom";


function Home(data){ //라우터에서 전달한 props를 인자로 받아옴
  const movies = data.movies; //영화정보 변수
  let loading = data.loading; //로딩상황 변수
  let boxoffice = []; //영화정보를 출력할 배열
  const movie = movies.map(movie=>( //영화정보를 새로운배열로 취하고 배열을 반환 
    <Boxoffice //Boxoffice 컴포넌트 호출
    key={movie.id} //영화정보의 id를 map의 key로 설정
    id={movie.id} //영화고유 id
    year={movie.year} //영화 개봉시기 
    title={movie.title} //영화 제목
    summary={movie.summary} //영화 줄거리
    medium_cover_image={movie.medium_cover_image} //영화 포스터
    large_cover_image={movie.large_cover_image}
    genres={movie.genres} //영화 장르
    rating={movie.rating} //영화 평점
    runtime={movie.runtime} //영화 상영시간
  />)); 

  for(let i=0; i<4; i++){ //메인홈에 보여줄 영화의 갯수
    boxoffice[i] = movie[i]; //갯수만큼 Boxoffice 컴포넌트를 저장 
  }

  return(
    <section className="App">
        {loading ? 
          ( <div className="loading"> <span className="loading_text">Loading...</span> </div> 
          ) : 
          ( <div className="movies home">
                <h4 className="home_menu_title">박스오피스</h4>
                <Link to="/movie" className="addmovie">더 많은 영화보기 +</Link> {/*클릭시 무비차트 컴포넌트로 이동*/}
                {boxoffice} {/*갯수만큼 Boxoffice 컴포넌트를 호출*/}
            </div> )
        }
    </section>
  );
}

export default Home;