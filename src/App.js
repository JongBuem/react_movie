import React from "react";
import {HashRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Detail from "./routes/Detail";
import Navigation from "./component/Navigation"

import axios from "axios";

class App extends React.Component{
  state = {
    Loading:true,
    Movies:[]
  };
 
 getMovies = async()=>{
   const {data:{data:{movies}}}= await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
   this.setState({
     Movies:movies,
     Loading:false
   })
 }
 
   componentDidMount(){
    this.getMovies();
   }
   
  render(){
    const {Loading, Movies} = this.state;
    return (
      <HashRouter>
        <Navigation/>
        <Route path="/" exact={true} 
        render={() => <Home movies={Movies} loading={Loading} />} />
        <Route path="/about" component={About}/>
        <Route path="/movie/:id" exact={true} component={Detail}/>
      </HashRouter>
    );
  }
}
// props를 전달할때 component=를 사용하면 렌더링할때 마다 새로운 컴포넌트 생성된다 이를 개선하기위해 render=를 사용함
// render로 하면 함수형 컴포넌트를 수용하고 불필요한 마운트를 작동 하지않음
export default App;