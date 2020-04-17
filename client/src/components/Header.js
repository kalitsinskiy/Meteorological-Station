import React from 'react';
import {logout} from "../actions/filters";
import {connect} from "react-redux";

const Header = ({logout}) =>(
    <header className="header">
        <div className="logo" id="logo">
            <img src="/icons/logo.svg" alt="mete0rologist"/>
        </div>

        <div className="exit_wrapper">
            <p className="exit" onClick={() => logout()}>Logout</p>
        </div>
    </header>
);

const mapStateToProps = () => {return {}};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);

