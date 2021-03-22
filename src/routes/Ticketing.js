import React from "react";
import "./Ticketing.css";
import Calendar from 'react-calendar'
import SimpleReactCalendar from 'simple-react-calendar'

function Ticketing(){
  return(
   <div className="ticketing">
       <h1>빠른예매</h1>

       <SimpleReactCalendar  />
   </div>
  );
}

export default Ticketing;




