import React from "react";
import Calendar from 'rc-calendar';
import "./Ticketing.css";
let _calendar =null;
let today =new Date();
let _year =today.getFullYear();
let _month =today.getMonth();
let _date =today.getDate();
let _day_1 = today.getDay();
let _day_2 = today.getDay();
_month=_month+1;
const Day_1_Array = ["오늘","오늘","오늘","오늘","오늘","오늘","오늘"];
const Day_2_Array = ["일","월","화","수","목","금","토"];
_day_2 = Day_1_Array[_day_2];

class Ticketing extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      mode : "off"
    };
}

toggle=()=>{
    if(this.state.mode==="off"){
      this.setState({
        mode:"on",
      });
      _calendar = <Calendar onSelect={function (date: moment[]) {
        let _today = date._d;
        _year = _today.getFullYear();
        _month = _today.getMonth();
        _month= _month+1;
        _date = _today.getDate();
        _day_2 = _today.getDay();

        if(_day_1 === _day_2){
          _day_2 = Day_1_Array[_day_2];
        } else {
          _day_2 = Day_2_Array[_day_2];
        }
        
      }}/>
    } else if(this.state.mode==="on"){
      this.setState({
        mode:"off",
      });
      _calendar = null;
    }
}

  render(){
    
    return(
    <div className="ticketing">
        <div className="ticketing_topmenu">

            <div className="ticketing_movie own">
              <div className="ticketinmovie">영화 선택</div>
              <div> sdas</div>
            </div>

            <div className="ticketing_movie">
              <div className="ticketinmovie">{Number(_year)}. {Number(_month)}. {Number(_date)}({String(_day_2)})</div>
              <i className="far fa-calendar-alt" onClick={this.toggle}>{_calendar}</i>
            </div>

        </div>
    </div>
    );
  }
}

export default Ticketing;



