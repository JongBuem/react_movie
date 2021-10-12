import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation(){
    return(
        <div className="nav">
            <div className="nav_menu"/>
            <Link to="/movie" className="nav_menu">영화차트</Link>
            <Link to="/ticketing" className="nav_menu">예매</Link> 
            <Link to="/" className="nav_menu icon"><i className="fas fa-film"><span className="fas_name">CINEMA</span></i></Link> 
            <Link to="/about" className="nav_menu">이벤트</Link>
            <Link to="/about" className="nav_menu">할인</Link>
            <div className="nav_menu_side">
                <div className="nav_menu_side_item">로그인</div>
                <div className="nav_menu_side_item">회원가입</div>
            </div>
        </div>
    );
}

export default Navigation;