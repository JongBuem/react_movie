import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation(){
    return(
        <div className="nav">
            <div className="nav_menu"/>
            <Link to="/movie" className="nav_menu">영화</Link>
            <Link to="/movie" className="nav_menu">예매</Link> 
            <Link to="/" className="nav_menu icon"><i class="fas fa-film"><span className="fas_name">CINEMA</span></i></Link> 
            <Link to="/about" className="nav_menu">About</Link>
            <Link to="/about" className="nav_menu">할인</Link>
            <div className="nav_menu"/>
        </div>
    );
}

export default Navigation;