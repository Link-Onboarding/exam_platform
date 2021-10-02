import React from "react";
import Slideshow from "./slider";

import "./sass/index.css";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <React.Fragment>
            <Slideshow />
            
            <div className="landing-container">
                <div className="content">
                    <img className="side-show" src="https://imgur.com/smHwDt7.png" alt='index' />
                    <div className="side">
                        <br/><br/>
                        <br/><br/>
                        Bine ai venit pe site-ul oficial Velane STORE, ne bucuram sa va incantam cu cele mai noi tendinte!
                        <br/><br/>
                        Din dorinta, pasiunea si dragostea pentru haine, iti oferim o galerie fashion foarte bogata, doar pentru tine!
                        <br/><br/>
        
                        <Link to="/products/all"><div className="button facebook">Vezi produsele noastre!</div></Link>
                    </div>
                </div>
            </div>

            <div className="landing-container">
                <div className="content">
                    <div className="side">
                        <div className="instagram">
                            <div className="profile">

                                <a href="https://www.instagram.com/velane.store/">
                                    <div className="profile-image">
                                        <img alt="velane.store's profile picture" src="https://imgur.com/OiKQvML.png" />
                                    </div>
                                </a>
                                <h1 className="profile-user-name">velane.store</h1>

                                <div className="profile-bio">
                                    <div>
                                        <div className="profile-desc">Clothing (Brand)</div>
                                        👜 SC VELANE STORE SRL<br />☎️ Pentru comenzi, mesaj privat! <br />🚛 Transport gratuit la doua produse comandate!<br /><br />Pagina noastra 👇<br />
                                        <a href="">www.facebook.com/Velane-STORE-130889157542149</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/><br/>
                    </div>
                    <img className="side-show" src="https://imgur.com/tU8g2WB.png" alt="index" />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Landing;