import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import StartPage from '../components/StartPage';
import {login} from "../actions/apiRequests"


const StartPageContainer = ({login}) =>{
    return (
        <Switch>
            <Route path="/db_auth" render={() => <StartPage login={login}/>}/>
            <Redirect to="/db_auth"/>
        </Switch>
    )
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: pass => dispatch(login(pass))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartPageContainer);
