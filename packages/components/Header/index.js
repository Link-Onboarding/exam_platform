import React from "react";
import { Link } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import Bag from "../Bag/index";

import './sass/index.css';

const Header = () => {
    return (
        <div className="header">
            <div className="header__title">
                <Link to="/">Velane</Link>
            </div>
            <div className="header__choices">
                <div className="header__choice">
                    <Link to="/products/new-arrivals" onClick={() => {
                            setTimeout(() => {
                                window.location.reload()
                            }, 1);
                        }
                    }>New Arrivals</Link>
                </div>
                <div className="header__choice">
                    <Link to="/products/promotions" onClick={() => {
                            setTimeout(() => {
                                window.location.reload()
                            }, 1);
                        }
                    }>Promotii</Link>
                </div>
                <div className="header__choice">
                    <Link to="/products/all" onClick={() => {
                            setTimeout(() => {
                                window.location.reload()
                            }, 1);
                        }
                    }>Toate produsele</Link>
                </div>
            </div>
            <div className="header__choices phoneXD">
                <div className="header__choice">
                    <Link to="/account">
                            <FontAwesomeIcon icon={faUser} />
                    </Link> 
                </div>
                <div className="header__choice">
                    <Bag />
                </div>
            </div>
        </div>
    )
};

export default Header;