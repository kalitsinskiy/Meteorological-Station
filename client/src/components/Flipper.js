import React, {Fragment, useState, useEffect} from 'react';
import ReactCardFlip from 'react-card-flip';
import {connect} from "react-redux";

import {setWizardNavigation} from "../actions/filters";


const Flipper = ({first, second, setWizardNavigation, wizNav}) => {
    const [side, setSide] = useState("front");

    useEffect(() =>{
        if (wizNav.location !== first.location && wizNav.location !== second.location){
            setSide("front")
        }
    }, [wizNav]);

    return (
        <Fragment>
            <div className="flipper_links">
                <p
                    className={`link ${wizNav.location === first.location ? "active" : ""}`}
                    onClick={() => {
                        setSide("front");
                        setWizardNavigation({...wizNav, location: first.location})
                    }}>
                    {first.title}
                </p>

                <p
                    className={`link ${wizNav.location === second.location ? "active" : ""}`}
                    onClick={() => {
                        setSide("back");
                        setWizardNavigation({...wizNav, location: second.location})
                    }}>
                    {second.title}
                </p>
            </div>

            <ReactCardFlip isFlipped={side === "back"} flipDirection="horizontal"
                           containerStyle={{perspective: "3000px"}}>
                {first.component}

                {second.component}
            </ReactCardFlip>
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

export default connect(mapStateToProps, mapDispatchToProps)(Flipper);
