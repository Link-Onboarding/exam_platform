import React from "react";

import './sass/index.css';

const Layout = props => {
    return (
        <div className="layout">
            {props.children}
        </div>
    )
};

export default Layout;