import React from "react";

import './sass/index.css';

const Layout = props => {
    return (
        <React.Fragment>
            <div className="layout">
                <h1>{props.title}</h1>
                <br />
                {props.children}
            </div>
        </React.Fragment>
    );
};

export default Layout;