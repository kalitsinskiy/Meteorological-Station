import {connect} from 'react-redux';
import Spinner from '../components/Spinner';

const mapStateToProps = ({spinner}) => {
    return {
        show: spinner,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        stopSpinner: () => dispatch({type:"STOP_SPINNER"})
    };
};

const SpinnerContainer = connect(mapStateToProps,mapDispatchToProps)(Spinner);


export default SpinnerContainer;
