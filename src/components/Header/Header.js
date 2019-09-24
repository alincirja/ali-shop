import React from "react";

import "./Header.scss";

const Header = props => {
    return (
        <header className="app-header">
            <span className="heading">Ali Shop</span>
            <span onClick={() => props.setShowListForm(!props.showListForm)} className={`add-list ${props.showListForm ? "with-form" : ""}`}></span>
        </header>
    );
};

export default Header;