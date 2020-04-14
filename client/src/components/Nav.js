import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {setWizardNavigation} from "../actions/filters";

const Nav = ({wizNav, previousStep, nextStep}) => {
    const {prevDisabled, prevHidden, nextDisabled, nextHidden, nextCallback, prevCallback} = wizNav;

    const next = () =>{
        if (nextCallback && typeof nextCallback === "function"){
            nextCallback();
            setWizardNavigation({...wizNav, nextCallback: null});
        }
        nextStep()
    };

    const prev = () =>{
        if (prevCallback && typeof prevCallback === "function"){
            prevCallback();
            setWizardNavigation({...wizNav, prevCallback: null});
        }

        previousStep()
    };


    return (
        <Fragment>
            <button
                className={`step prev ${prevHidden ? "hidden" : ""}`}
                disabled={prevDisabled}
                onClick={prev}>
                Previous Step
            </button>

            <button
                className={`step next ${nextHidden ? "hidden" : ""}`}
                disabled={nextDisabled}
                onClick={next}>
                Next Step
            </button>
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
