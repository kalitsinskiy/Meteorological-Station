import {connect} from 'react-redux';
import MeteoPostsComponent from '../components/MeteoPostsComponent';
import {createData, editData, deleteData} from "../actions/apiRequests";
import {setWizardNavigation} from "../actions/filters";


const mapStateToProps = ({stations, meteoposts, filters}) => {
    return {
        stations,
        meteoposts,
        wizNav: filters.wizNav,
        pageSize: filters.pageSize
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createData: (options, data, type) => dispatch(createData(options, data, type)),
        editData: (options, data, type) => dispatch(editData(options, data, type)),
        deleteData: (options, type) => dispatch(deleteData(options, type)),
        setWizardNavigation: obj => dispatch(setWizardNavigation(obj)),
    }
};
const MeteoPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MeteoPostsComponent);


export default MeteoPostsContainer;
