import React from "react";

function Detail({location, history}){
    if(location.state === undefined){// 클릭하지 않고 페이지를 열면 데이터가 없어서 바로 디테일 페이지로 갈경우
        history.push("/");// 메인페이지로 이동시킴
    }
    if(location.state){// 이렇게 하는 이유는 주소창을 한번더 검색하면 location이 존재하지 않기 때문에 에러 발생을 방지 
      return <span> {location.state.title} </span>
    } else{
        return null;
    }
}

export default Detail;