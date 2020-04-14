import {connect} from 'react-redux';
import MeteoPostsComponent from '../components/MeteoPostsComponent';
import {createData, editData, deleteData, getComplexSelection} from "../actions/apiRequests";
import {setWizardNavigation} from "../actions/filters";


const mapStateToProps = ({meteoposts, filters}) => {
    return {
        meteoposts,
        wizNav: filters.wizNav
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getComplexSelection: (options, type) => dispatch(getComplexSelection(options, type)),
        createData: (options, data, type) => dispatch(createData(options, data, type)),
        editData: (options, data, type) => dispatch(editData(options, data, type)),
        deleteData: (options, type) => dispatch(deleteData(options, type)),
        setWizardNavigation: obj => dispatch(setWizardNavigation(obj)),
    }
};
const MeteoPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MeteoPostsComponent);


export default MeteoPostsContainer;
