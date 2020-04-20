import {connect} from 'react-redux';
import StationsComponent from '../components/StationsComponent';
import {getData, createData, editData, deleteData, getComplexSelection, complexRequest} from "../actions/apiRequests";
import {setWizardNavigation} from "../actions/filters";


const mapStateToProps = ({stations, filters}) => {
    return {
        stations,
        wizNav: filters.wizNav,
        pageSize: filters.pageSize,
        isAdmin: filters.isAdmin,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        complexRequest: (reqArr, dispatchType) => dispatch(complexRequest(reqArr, dispatchType)),
        getData: (table, type) => dispatch(getData(table, type)),
        getComplexSelection: (options, type) => dispatch(getComplexSelection(options, type)),
        createData: (options, data, type) => dispatch(createData(options, data, type)),
        editData: (options, data, type) => dispatch(editData(options, data, type)),
        deleteData: (options, type) => dispatch(deleteData(options, type)),
        setWizardNavigation: obj => dispatch(setWizardNavigation(obj)),
    }
};
const StationsContainer = connect(mapStateToProps, mapDispatchToProps)(StationsComponent);


export default StationsContainer;
