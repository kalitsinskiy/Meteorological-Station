import {connect} from 'react-redux';
import MeteoPolesComponent from '../components/MeteoPolesComponent';
import {createData, editData, deleteData} from "../actions/apiRequests";
import {setWizardNavigation} from "../actions/filters";

const mapStateToProps = ({meteopoles, meteogrounds, filters}) => {
    return {
        meteopoles,
        meteogrounds,
        wizNav: filters.wizNav,
        pageSize: filters.pageSize,
        isAdmin: filters.isAdmin,
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
const MeteoPolesContainer = connect(mapStateToProps, mapDispatchToProps)(MeteoPolesComponent);


export default MeteoPolesContainer;
