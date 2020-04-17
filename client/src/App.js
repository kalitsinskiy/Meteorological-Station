import React, {Fragment} from 'react'
import {connect} from 'react-redux';
import ReduxToastr from 'react-redux-toastr'

import BaseComponent from './components/BaseComponent'
import SpinnerContainer from './containers/SpinnerContainer'
import StartPageContainer from './containers/StartPageContainer'

const App = ({isDBAvailable}) => (
    <Fragment>
        {isDBAvailable ? <BaseComponent/> : <StartPageContainer/>}

        <SpinnerContainer/>

        <ReduxToastr
            preventDuplicates
            timeOut={4000}
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            closeOnToastrClick/>
    </Fragment>

);


const mapStateToProps = (state) => {
  return {
      isDBAvailable: state.filters.isDBAvailable
  };
};

export default connect(mapStateToProps)(App);
