import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation(){
    return(
        <div className="nav">
            <Link to="/" className="nav_menu">Home</Link> 
            <Link to={{
                pathname : "/about",
                state:{
                    name : true 
                }
            }} 
            className="nav_menu">About</Link>
        </div>
    );
}

export default Navigation;