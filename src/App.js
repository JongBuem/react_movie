import React from "react";
import {HashRouter, Route } from "react-router-dom";
import Navigation from "./component/Navigation"
import Moviechart from "./routes/Moviechart";
import Home from "./routes/Home";
import Ticketing from "./routes/Ticketing";
import About from "./routes/About";
import Detail from "./routes/Detail";
import axios from "axios";

class App extends React.Component{
  state = {
    Loading:true, //영화 API 정보들을 가져오기전, 로딩중
    Movies:[] //영화정보 배열
  };
 
 getMovies = async()=>{ //axios가 url 영화정보를 받아올때 까지 실행
   const {data:{data:{movies}}}= await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating"); //영화 정보를 가져오기 위한 작은 레이아웃
   this.setState({
     Movies:movies, //영화정보를 배열로 수정 
     Loading:false //영화정보를 가져오기 성공, 로딩 끝
   })
 }
 
   componentDidMount(){ //render() 호출 이후 실행
    this.getMovies(); //영화정보를 가져오는 함수
   }

  render(){ //원하는 컴포넌트들을 화면에 동시에 출력하거나 따로 출력하기 위한 라우터 이용
    const {Loading, Movies} = this.state; //영화정보와 로딩상황을 변수로 나타냄
    console.log(Movies)
    return (
      <HashRouter>
        <Navigation/> {/*네비게이션 컴포넌트*/}
        <Route path="/movie" exact={true} render={() => <Moviechart movies={Movies} loading={Loading} />} /> {/*무비차트 라우터*/}
        <Route path="/ticketing" render={() => <Ticketing movies={Movies} loading={Loading} />} /> {/*예매 라우터*/}
        <Route path="/" exact={true} render={() => <Home movies={Movies} loading={Loading} />} /> {/*메인홈 라우터*/}
        <Route path="/about" component={About}/> {/*이벤트, 할인 라우터*/}
        <Route path="/movie/:id" exact={true} component={Detail}/> {/*영화정보 라우터*/}
      </HashRouter>
    );
  }
}
// 라우터 컴포넌트에 props를 전달할때에 "component="를 사용하면 렌더링할때 마다 새로운 컴포넌트 생성한다 이를 개선하기위해서 "render="를 사용함
// "render=" 는 함수형 컴포넌트를 수용하고 불필요한 마운트를 작동 하지않음
export default App;