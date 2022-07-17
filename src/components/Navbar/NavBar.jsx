import React from "react";
import { Link } from "react-router-dom";

let NavBar = () => {
    return (
        <React.Fragment>
            <nav className="navbar navbar-light navbar-expand-sm" style={{backgroundColor: "#e3f2fd"}} >
                <div className="container">
                    <Link to={'/'} className="navbar-brand">
                        <i className="bi bi-list-columns-reverse fa-lg" style={{color: "#F387B7"}}/>   Ricky's <span style={{color: "#F387B7"}}>List</span></Link>
                </div>
            </nav>
        </React.Fragment>
    )


};

export default NavBar;