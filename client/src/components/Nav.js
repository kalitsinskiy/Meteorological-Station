import React, {Fragment} from 'react';
import {connect} from "react-redux";
import ReactTooltip from "react-tooltip";

import Arrow from "./Arrow";

import "../styles/Nav.sass";

import {setWizardNavigation} from "../actions/filters";

const Nav = ({wizNav, previousStep, nextStep}) => {
    const {prevDisabled, prevHidden, nextDisabled, nextHidden, nextMessage = null} = wizNav;

    const isHidden = () => ["employees", "transport", "indicators"].some(it => it === wizNav.location);

    return (
        <Fragment>
            <button
                className={`step prev ${prevHidden ? "hidden" : ""}`}
                onClick={() => !prevDisabled && previousStep()}
            >
                <Arrow rotated isDisabled={prevDisabled}/>
            </button>

            <button
                data-tip
                data-tip-disable={false}
                data-for='next_tooltip'
                className={`step next ${nextHidden || isHidden() ? "hidden" : ""} ${nextDisabled ? "disabled" : ""}`}
                onClick={() => !nextDisabled && nextStep()}
            >
                <Arrow isDisabled={nextDisabled}/>
            </button>

            <ReactTooltip
                id='next_tooltip'
                type='info'
                className={`tooltip ${!nextDisabled || isHidden() || nextHidden  ? "hidden" : ""}`}
                place="top"
                backgroundColor="#f50057">
                <span>{nextMessage}</span>
            </ReactTooltip>

        </Fragment>
    );
};


const mapStateToProps = ({filters}) => {
    return {
        wizNav: filters.wizNav
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setWizardNavigation: obj => dispatch(setWizardNavigation(obj)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
