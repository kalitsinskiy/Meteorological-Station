import React, {Fragment} from 'react'
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom'
import ReduxToastr from 'react-redux-toastr'

import BaseContainer from './containers/BaseContainer'
import SpinnerContainer from './containers/SpinnerContainer'
import StartPageContainer from './containers/StartPageContainer'

const App = ({isDBAvailable}) => {
  return (
      <Switch>
        <Route path="/" render={() => {
          return (
              <Fragment>
                {isDBAvailable ? <BaseContainer/> : <StartPageContainer/>}
                <SpinnerContainer/>
                <ReduxToastr
                    preventDuplicates
                    timeOut={4000}
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    closeOnToastrClick/>
              </Fragment>
          )
        }}/>
      </Switch>
  )
};


const mapStateToProps = (state) => {
  return {
      isDBAvailable: state.filters.isDBAvailable
  };
};

export default connect(mapStateToProps)(App);
