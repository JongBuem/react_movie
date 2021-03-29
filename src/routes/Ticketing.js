import React, { useState } from "react";
import Calendar from 'rc-calendar';
import "./Ticketing.css";
import { Link } from "react-router-dom";

let _calendar =<Calendar/>;
let today =new Date();
let _year =today.getFullYear();
let _month =today.getMonth() +1;
let _date =today.getDate();
let _date_1 =today.getDate();
let _day = today.getDay();
let _day_1 = today.getDay();
let _ticketingmovie_time_title ="영화를 선택해 주세요."
let _ticket = null;

const Day_1_Array = ["오늘","오늘","오늘","오늘","오늘","오늘","오늘"];
const Day_2_Array = ["일","월","화","수","목","금","토"];
_day = Day_1_Array[_day];


function Ticketingmovieposter({title, small_cover_image}){
  let _title=title;
  if(_title.length >20){
      _title = <span>{title.slice(0,20)}...</span> 
  }
  return(
    <div className="Ticketinposter">
      <Link to="/ticketing" className="Ticketinposter" onClick={function(){ _ticketingmovie_time_title = title; }.bind(this)}>
        <img src={small_cover_image} className="Ticketinposter"></img>
        <h4>{_title}</h4>
      </Link>
    </div>
  );
}

function Ticketing(data){
  const [ state, setState ] = useState({ mode:"off", ticket:"off"});
  const [ times, setTimes ] = useState({
    count:0,
    time:[
      {when:"10:30", where:"1관"},
      {when:"11:30", where:"2관"},
      {when:"12:00", where:"3관"},
      {when:"12:50", where:"14관"},
      {when:"14:30", where:"10관"},
      {when:"17:00", where:"7관"},
      {when:"19:23", where:"6관"},
      {when:"20:00", where:"10관"},
      {when:"21:10", where:"5관"},
      {when:"22:10", where:"1관"},
      {when:"23:30", where:"6관"},
    ]
  });
  let time = times.time
  const movies = data.movies;
  const toggle=()=>{
      if(state.mode==="on"){
        _calendar = <Calendar onSelect={function (date: moment[]) {
          let _today = date._d;
          _year = _today.getFullYear();
          _month = _today.getMonth() +1;
          _date = _today.getDate();
          _day = _today.getDay();

          if(_day === _day_1 && _date === _date_1){
            _day = Day_1_Array[_day];
          } else {
            _day = Day_2_Array[_day];
          }
          
        }}/>
        setState({ ...state, mode:"off",ticket:"off" });

      } else if(state.mode==="off"){
        setState({ ...state, mode:"on",ticket:"on" });
        _calendar = null;
      }
  }

  if(state.ticket==="on"){
    _ticket = 
    <div className="movie_ticket">
      <span>매표</span>
      <div>영화 : {_ticketingmovie_time_title}</div>
      <div>날짜 : {Number(_year)}. {Number(_month)}. {Number(_date)}({String(_day)})</div>
      <div>시간 : {time[times.count].when}  ({time[times.count].where})</div>
    </div>
  } else if(state.ticket==="off"){
    _ticket = null;
  }

    return(
    <div className="ticketing">
        <div className="ticketing_topmenu">

            <div className="ticketing_movie own">
              <div className="ticketingmovie">영화 선택</div>
              <div data={data} className="ticketingmovie_poster">
                {
                    movies.map(movie=>(
                      <Ticketingmovieposter
                      key={movie.id}
                      title={movie.title} 
                      small_cover_image={movie.small_cover_image}/>)) 
                }
              </div>
            </div>

            <div className="ticketing_movie">
              <div className="ticketingmovie" onClick={toggle}>{Number(_year)}. {Number(_month)}. {Number(_date)}({String(_day)})</div>
              <i className="far fa-calendar-alt" onClick={toggle} ></i>
              <div className="ticketingmovie_calendar">
                <button onClick={toggle}>{_calendar}</button>
                <div data={data} className="ticketingmovie_time">
                  {_ticketingmovie_time_title}
                  <div className="twoD">2D</div>
                  <div className="ticketingmovie_time_info">
                      <div className="_time_info_1">
                          <div onClick={()=>{ setTimes({ ...times, count:0 });}}>{time[0].when}<span>{time[0].where}</span></div>
                          <div onClick={()=>{ setTimes({ ...times, count:1 });}}>{time[1].when}<span>{time[1].where}</span></div>
                          <div onClick={()=>{ setTimes({ ...times, count:2 });}}>{time[2].when}<span>{time[2].where}</span></div>
                      </div>
                      <div className="_time_info_1">
                          <div onClick={()=>{ setTimes({ ...times, count:3 });}}>{time[3].when}<span>{time[3].where}</span></div>
                          <div onClick={()=>{ setTimes({ ...times, count:4 });}}>{time[4].when}<span>{time[4].where}</span></div>
                          <div onClick={()=>{ setTimes({ ...times, count:5 });}}>{time[5].when}<span>{time[5].where}</span></div>
                      </div>
                      <div className="_time_info_1">
                          <div onClick={()=>{ setTimes({ ...times, count:6 });}}>{time[6].when}<span>{time[6].where}</span></div>
                          <div onClick={()=>{ setTimes({ ...times, count:7 });}}>{time[7].when}<span>{time[7].where}</span></div>
                          <div onClick={()=>{ setTimes({ ...times, count:8 });}}>{time[8].when}<span>{time[8].where}</span></div>
                      </div>
                      <div className="_time_info_1">
                          <div onClick={()=>{ setTimes({ ...times, count:9 });}}>{time[9].when}<span>{time[9].where}</span></div>
                          <div onClick={()=>{ setTimes({ ...times, count:10 });}}>{time[10].when}<span>{time[10].where}</span></div>
                      </div>
                  </div>
                </div>
                {_ticket }
              </div>
            </div>

        </div>
    </div>
    );
}

export default Ticketing;


