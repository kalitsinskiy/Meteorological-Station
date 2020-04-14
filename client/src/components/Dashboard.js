import React from 'react';
import StepWizard from 'react-step-wizard';
import StationsContainer from '../containers/StationsContainer';
import MeteoPostsContainer from '../containers/MeteoPostsContainer';
import EmployeesContainer from '../containers/EmployeesContainer';
import Fliping from '../components/Fliping';
import Nav from './Nav';


const Dashboard = () => {

    return (
        <StepWizard className="wizard" nav={<Nav/>}>
            <StationsContainer/>
            {/*<MeteoPostsContainer/>*/}
            {/*<EmployeesContainer/>*/}
            <Fliping
                first={{component: <MeteoPostsContainer/>, title: "Meteo posts"}}
                second={{component: <EmployeesContainer/>, title: "Employees"}}
            />
        </StepWizard>
    );
};


export default Dashboard
