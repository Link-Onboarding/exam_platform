import React from "react";
import { Link } from "react-router-dom"

import './sass/index.css';

const Footer = () => {
    return (
        <React.Fragment>
            <div className="footer">
                <div className="footer__title">
                    <Link to="/">Velane</Link>
                </div>
                <div className="footer__columns">
                    <div className="footer__column">
                        <div className="title">SUPORT CLIENTI</div><br />
                        <Link to="/returns">Informatii Retur</Link><br />
                        <Link to="/transport">Informatii Transport</Link><br />
                        <a href="https://anpc.ro/">ANPC</a><br />
                        <a href="https://anpc.ro/categorie/1271/sal">ANPC - SAL</a><br />
                        
                    </div>
                    <div className="footer__column">
                        <div className="title">FIRMA NOASTRA</div><br />
                        <Link to="/contact">Contacteaza-ne</Link><br />
                        <Link to="/about">Despre noi</Link>
                        
                    </div>
                    <div className="footer__column">
                        <div className="title">SOCIAL MEDIA</div>
                        <a href="https://www.instagram.com/velane.store/"><div className="button instagram">Instagram</div></a>
                        <a href="https://www.facebook.com/Velane-STORE-130889157542149"><div className="button facebook">Facebook</div></a>
                    </div>

                    <div className="footer__column">
                        <div className="title">NEWSLETTER</div>
                        <input placeholder="Introdu email..." />
                        <div className="button">Aboneaza-te</div>
                    </div>
                </div>
            </div>

            <div className="copyright">
                <div className="title">
                    SC VELANE STORE SRL © 2021 Velane Store
                </div>
                <div className="flex">
                    <div className="flex__child">
                    <Link to="/tos">Termeni si Conditii</Link>
                    </div>
                    <div className="flex__child">
                    <Link to="/privacy">Politica de Confidentialitate</Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Footer;