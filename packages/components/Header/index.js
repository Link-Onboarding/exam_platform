import React from "react";
import { Link } from "react-router-dom"

import './sass/index.css';

const Header = () => {
    const authToken = localStorage.getItem("authToken");

    return (
        <div className="header">
            <div className="title">
                <Link to="/">Platforma de examen</Link>
            </div>

            {
                authToken!==null?
                <div className="choices">
                    <div className="choice">
                        Notificari
                    </div>
                </div>
                :
                null
            }
        </div>
    )
};

export default Header;