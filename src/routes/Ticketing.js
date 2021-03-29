import React, { useState } from "react";
import Calendar from 'rc-calendar';
import "./Ticketing.css";
import { Link } from "react-router-dom";

let _calendar =<Calendar/>; //켈린더 API
let today =new Date(); //현재 시간, 날짜 정보
let _year =today.getFullYear(); //년도
let _month =today.getMonth() +1; //월
let _date =today.getDate(); //몇일
let _date_1 =today.getDate(); //켈린더가 선택한 일과 비교하기 위한 변수
let _day = today.getDay(); //요일 
let _day_1 = today.getDay(); //켈린더가 선택한 요일과 비교하기 위한 변수
let _ticketingmovie_time_title ="영화를 선택해 주세요." //영화 선택전 제목
let _ticket = null; //매표 출력 

const Day_1_Array = ["오늘","오늘","오늘","오늘","오늘","오늘","오늘"]; //오늘 배열
const Day_2_Array = ["일","월","화","수","목","금","토"]; //요일 배열
_day = Day_1_Array[_day]; //현재는 오늘이기 때문에 오늘배열 출력


function Ticketingmovieposter({title, small_cover_image}){ //영화정보를 인자로 받아옴
  let _title=title; //영화 제목
  if(_title.length >20){ //영화제목이 20글자가 넘으면
      _title = <span>{title.slice(0,20)}...</span> //20글자이후는 ...으로 표시
  }
  return( //해당영화를 클릭시 영화제목을 전역변수의 영화제목으로 변경
    <div className="Ticketinposter">
      <Link to="/ticketing" className="Ticketinposter" onClick={function(){ _ticketingmovie_time_title = title; }.bind(this)}>
        <img src={small_cover_image} className="Ticketinposter"></img>
        <h4>{_title}</h4>
      </Link>
    </div>
  );
}

function Ticketing(data){ //라우터에서 전달한 props를 인자로 받아옴
  const [ state, setState ] = useState({ mode:"off", ticket:"off"}); //켈린더 와 매표의 초기모드
  const [ times, setTimes ] = useState({ 
    count:0, //몇관
    time:[ //상영시간
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
  const time = times.time 
  const movies = data.movies;
  
  const toggle=()=>{ //날짜 선택, 켈린더 이미지 클릭시
      if(state.mode==="on"){ //켈린더 모드가 on일경우
        _calendar = <Calendar onSelect={function (date: moment[]) { //켈린더 API를
          let _today = date._d;//켈린더가 선택한 날짜의 데이터의
          _year = _today.getFullYear(); //연도
          _month = _today.getMonth() +1; //월
          _date = _today.getDate(); //일
          _day = _today.getDay(); //요일
          if(_day === _day_1 && _date === _date_1){ //오늘 [요일,일] 과 선택한 [요일,일] 이 같으면
            _day = Day_1_Array[_day]; //켈린더의 요일을 오늘로 변경
          } else { //그렇지 않다면 
            _day = Day_2_Array[_day]; //켈린더의 해당 요일로 변경
          }
        }}/>
        setState({ ...state, mode:"off",ticket:"off" }); //켈린더와 티켓 모드를 off으로 변경
      } else if(state.mode==="off"){ //켈린더 모드가 off일경우
        setState({ ...state, mode:"on",ticket:"on" }); //켈린더와 티켓 모드를 on으로 변경
        _calendar = null; //켈린더를 지움
      } 
  }

  if(state.ticket==="on"){ //매표의 모드가 on일 경우
    _ticket =  //"_ticket"은 매표정보를 출력
    <div className="movie_ticket"> 
      <span>매표</span>
      <div>영화 : {_ticketingmovie_time_title}</div>
      <div>날짜 : {Number(_year)}. {Number(_month)}. {Number(_date)}({String(_day)})</div>
      <div>시간 : {time[times.count].when}  ({time[times.count].where})</div>
    </div>
  } else if(state.ticket==="off"){ //매표의 모드가  off일 경우
    _ticket = null; //매표정보를 지움
  }

    return(
    <div className="ticketing">
        <div className="ticketing_topmenu">

            <div className="ticketing_movie own"> {/* 영화선택 메뉴 */}
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

            <div className="ticketing_movie"> {/* 상영시간, 날짜, 메표 정보 메뉴 */}
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


