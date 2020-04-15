import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Meteoboard from '../components/Meteoboard'
import ErrorBoundary from "./ErrorBoundary";

class BaseComponent extends Component {

    render() {
        return (
            <div className="main-wrapper">
                {/*<LeftSidebarContainer/>*/}

                    {/*<HeaderContainer/>*/}
                    <ErrorBoundary>
                        <Switch>
                            <Route path="/meteoboard" component={Meteoboard}/>

                            <Redirect to="/meteoboard"/>
                        </Switch>
                    </ErrorBoundary>
            </div>
        )
    }
}

export default BaseComponent;
