import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

// import LeftSidebarContainer from '../containers/LeftSidebarContainer'
// import HeaderContainer from '../containers/HeaderContainer'
import Dashboard from './Dashboard'
// import EventsContainer from '../containers/EventsContainer'
// import CompareComponent from './CompareComponent'
// import ItemsComponent from './ItemsComponent'
// import ReportsComponent from './ReportsComponent'
// import AdminComponent from './admin/AdminComponent'
import ErrorBoundary from "./ErrorBoundary";

class BaseComponent extends Component {
    // componentDidMount() {
    //     const {getCurrentSession, getMall_by_allMalls, getMall, user: {roles, malls_id}} = this.props;
    //     getCurrentSession();
    //
    //     if (roles === "admin") {  // this code done when, user relogin without reloading page
    //         getMall_by_allMalls({nvr: true, floor: true})
    //     } else if ((roles === "manager" || roles === "marketer") && malls_id) {
    //         getMall(malls_id, {nvr: true, floor: true})
    //     }
    // }
    //
    // componentDidUpdate(prevProps){
    //     const {user: {roles, malls_id}, getMall_by_allMalls, getMall} = this.props;
    //     if(roles && roles !== prevProps.user.roles ){  // get mall when data about user came
    //         if(roles === "admin"){
    //             getMall_by_allMalls({nvr: true, floor: true})
    //         }else if((roles === "manager" || roles === "marketer") && malls_id){
    //             getMall(malls_id, {nvr: true, floor: true})
    //         }
    //     }
    // }

    render() {
        // const { role, newUser, isOpenSidebarMenu } = this.props;
        return (
            <div className="main-wrapper">
                {/*<LeftSidebarContainer/>*/}

                {/*<div className={`right-panel ${!isOpenSidebarMenu ? "hide" : ""}`}>*/}
                {/*<div>*/}
                    {/*<HeaderContainer/>*/}
                    <ErrorBoundary>
                        <Switch>
                            <Route path="/meteoboard" component={Dashboard}/>
                            {/*<Route path="/events" component={EventsContainer}/>*/}
                            {/*<Route path="/compare" component={CompareComponent}/>*/}
                            {/*<Route path="/items" component={ItemsComponent}/>*/}
                            {/*<Route path="/reports" component={ReportsComponent}/>*/}
                            {/*<Route path="/profile" component={ProfileContainer}/>*/}
                            {/*{(role === "manager" || role === "admin") && <Route path="/admin" component={AdminComponent}/>}*/}
                            <Redirect to="/meteoboard"/>
                        </Switch>
                    </ErrorBoundary>
                {/*</div>*/}
            </div>
        )
    }
}

export default BaseComponent;
