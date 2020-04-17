import React, {Fragment, useEffect} from 'react';
import {connect} from "react-redux";
import ReactTooltip from "react-tooltip";

import Arrow from "./Arrow";

import "../styles/Nav.sass";

import {setWizardNavigation} from "../actions/filters";

const links = [
    'Meteo stations',
    'Meteo posts/Employees',
    'Meteo grounds/Transport',
    'Meteo poles',
    'Devices',
    'Indicators'
];

const Nav = ({wizNav, previousStep, nextStep, goToStep, currentStep}) => {
    const {prevDisabled, prevHidden, nextDisabled, nextHidden, nextMessage = null} = wizNav;

    useEffect(() =>{
        const logo = document.getElementById("logo");
        logo.addEventListener("click",() => goToStep(1));
    }, [goToStep]);

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

            <div className="footer_nav">
                {links.map((it, index)=> {
                    const step = index + 1;
                    const isActive = currentStep >= step || (step === currentStep + 1 && !nextDisabled);

                    return(
                        <button
                            className="footer_link"
                            key={step}
                            onClick={() => isActive && goToStep(step)}
                            disabled={!isActive}
                        >
                            {it}
                        </button>
                    )
                })}
            </div>

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
