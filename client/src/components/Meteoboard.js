import React,{useState} from 'react';
import StepWizard from 'react-step-wizard';
import {connect} from "react-redux";

import {complexRequest, getComplexSelection} from "../actions/apiRequests";
import {setWizardNavigation} from "../actions/filters";

import StationsContainer from '../containers/StationsContainer';
import MeteoPostsContainer from '../containers/MeteoPostsContainer';
import EmployeesContainer from '../containers/EmployeesContainer';
import MeteoGroundsContainer from '../containers/MeteoGroundsContainer';
import TransportContainer from '../containers/TransportContainer';
import MeteoPolesContainer from '../containers/MeteoPolesContainer';
import DevicesContainer from '../containers/DevicesContainer';
import IndicatorsContainer from '../containers/IndicatorsContainer';

import Flipper from '../components/Flipper';
import Nav from './Nav';


const Meteoboard = (props) => {
    const {complexRequest, setWizardNavigation, getComplexSelection} = props;

    const [stationsOptions, setStationsOptions] = useState([]);
    const [meteoPostsOptions, setMeteoPostsOptions] = useState([]);
    const [meteoGroundsOptions, setMeteoGroundsOptions] = useState({});
    const [meteoPolesOptions, setMeteoPolesOptions] = useState({});
    const [devicesOptions, setDevicesOptions] = useState({});

    const onStepChange = ({activeStep, previousStep}) => {
        if (previousStep === 1 && activeStep === 2){
            complexRequest(
                stationsOptions,
                "GET_METEO_POSTS_AND_EMPLOYEES",
                setWizardNavigation({
                        location: "meteo_posts",
                        nextDisabled: true,
                        nextHidden: false,
                        prevDisabled: false,
                        prevHidden: false,
                        nextMessage: "Choose some meteo posts"
                    }
                )
            )
        }
        else if(previousStep === 2 && activeStep === 1){
            setWizardNavigation({
                location: "meteo_stations",
                nextDisabled: false,
                nextHidden: false,
                prevDisabled: true,
                prevHidden: true,
                nextMessage: "Choose some stations"
            })
        }
        else if(previousStep === 2 && activeStep === 3){
            complexRequest(meteoPostsOptions, "GET_METEO_GROUNDS_AND_TRANSPORT",
                setWizardNavigation({
                        location: "meteo_grounds",
                        nextDisabled: true,
                        nextHidden: false,
                        prevDisabled: false,
                        prevHidden: false,
                        nextMessage: "Choose some meteo grounds"
                    }
                )
            )
        }
        else if(previousStep === 3 && activeStep === 2){
            setWizardNavigation({
                    location: "meteo_posts",
                    nextDisabled: false,
                    nextHidden: false,
                    prevDisabled: false,
                    prevHidden: false,
                    nextMessage: "Choose some meteo posts"
                }
            )
        }
        else if (previousStep === 3 && activeStep === 4) {
            getComplexSelection(
                meteoGroundsOptions,
                "METEO_POLES",
                setWizardNavigation({
                        location: "meteo_poles",
                        nextDisabled: true,
                        nextHidden: false,
                        prevDisabled: false,
                        prevHidden: false,
                        nextMessage: "Choose some meteo poles"
                    }
                ));
        }
        else if (previousStep === 4 && activeStep === 3) {
            setWizardNavigation({
                    location: "meteo_grounds",
                    nextDisabled: false,
                    nextHidden: false,
                    prevDisabled: false,
                    prevHidden: false,
                    nextMessage: "Choose some meteo grounds"
                }
            )
        }
        else if (previousStep === 4 && activeStep === 5) {
            getComplexSelection(
                meteoPolesOptions,
                "DEVICES",
                setWizardNavigation({
                        location: "devices",
                        nextDisabled: true,
                        nextHidden: false,
                        prevDisabled: false,
                        prevHidden: false,
                        nextMessage: "Choose some devices"
                    }
                ));
        }
        else if (previousStep === 5 && activeStep === 4) {
            setWizardNavigation({
                    location: "meteo_poles",
                    nextDisabled: false,
                    nextHidden: false,
                    prevDisabled: false,
                    prevHidden: false,
                    nextMessage: "Choose some meteo poles"
                }
            )
        }
        else if (previousStep === 5 && activeStep === 6) {
            getComplexSelection(
                devicesOptions,
                "INDICATORS",
                setWizardNavigation({
                        location: "indicators",
                        nextDisabled: true,
                        nextHidden: false,
                        prevDisabled: false,
                        prevHidden: false,
                        nextMessage: "Choose some indicators"
                    }
                ));
        }
        else if (previousStep === 6 && activeStep === 5) {
            setWizardNavigation({
                    location: "devices",
                    nextDisabled: false,
                    nextHidden: false,
                    prevDisabled: false,
                    prevHidden: false,
                    nextMessage: "Choose some devices"
                }
            )
        }
        else if (activeStep === 1) {
            setWizardNavigation({
                    location: "meteo_stations",
                    nextDisabled: false,
                    nextHidden: false,
                    prevDisabled: true,
                    prevHidden: true,
                    nextMessage: "Choose some stations"
                }
            )
        }
        else if (previousStep > activeStep) {
            setWizardNavigation({
                    nextDisabled: false,
                    nextHidden: false,
                    prevDisabled: false,
                    prevHidden: false,
                    nextMessage: "Choose some item from list"
                }
            )
        }
    };

    return (
        <StepWizard className="main-wrapper" nav={<Nav/>} onStepChange={onStepChange}>
            <StationsContainer setStationsOptions={setStationsOptions}/>

            <Flipper
                first={{
                    component: <MeteoPostsContainer setMeteoPostsOptions={setMeteoPostsOptions}/>,
                    title: "Meteo posts",
                    location: "meteo_posts"
                }}
                second={{component: <EmployeesContainer/>, title: "Employees", location: "employees"}}
            />

            <Flipper
                first={{
                    component: <MeteoGroundsContainer setMeteoGroundsOptions={setMeteoGroundsOptions}/>,
                    title: "Meteo grounds",
                    location: "meteo_grounds"
                }}
                second={{component: <TransportContainer/>, title: "Transport", location: "transport"}}
            />

            <MeteoPolesContainer setMeteoPolesOptions={setMeteoPolesOptions}/>

            <DevicesContainer setDevicesOptions={setDevicesOptions}/>

            <IndicatorsContainer/>
        </StepWizard>
    );
};

const mapStateToProps = () => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        complexRequest: (reqArr, dispatchType, callback) => dispatch(complexRequest(reqArr, dispatchType, callback)),
        getComplexSelection: (options, type, callback) => dispatch(getComplexSelection(options, type, callback)),
        setWizardNavigation: obj => dispatch(setWizardNavigation(obj)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Meteoboard);
