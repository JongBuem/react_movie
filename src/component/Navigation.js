import React, { useState } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation(){
    const [state, setState] = useState("none");

    const loginToggle=(num)=>{
        if(num==1) setState("block")
        else setState("none")
    }

    return(
        <div className="nav">
            <div className="nav_icon">
                <Link to="/"><i className="fas fa-film"/><span><b>CINEMA</b></span></Link> 
            </div>
            <div className="nav_menu">
                <Link to="/movie" className="nav_menu_item">영화</Link>
                <Link to="/ticketing" className="nav_menu_item">예매</Link> 
                {/* <Link to="/about" className="nav_menu_item">이벤트</Link>
                <Link to="/about" className="nav_menu_item">할인</Link> */}
                <div className="nav_menu_item" onClick={()=>loginToggle(1)}><i class="far fa-user-circle" style={{fontSize:"30px"}}></i></div>
            </div>
            <div className="login" style={{display:state}}>
                <div className="close"> <span onClick={()=>loginToggle(2)}><i class="fas fa-times"></i></span></div>
                <form method="POST" className="loginBox">
                    로그인
                    <input type="text" placeholder="ID" name="id" />
                    <input type="password" placeholder="Password" name="password" />
                    <span style={{color: "red", fontSize: "10px"}}>asd</span>
                    <input type="submit" className="sub" value="Login" />
                </form>
                <div>
                    <ol>
                        <li><a href="/signup">회원가입</a></li>
                        <li><a href="/find">ID/Password 찾기</a></li>
                    </ol>
                </div>
            </div>
        </div>
    );
}




export default Navigation;