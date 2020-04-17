import {connect} from 'react-redux';
import MeteoGroundsComponent from '../components/MeteoGroundsComponent';
import {createData, editData, deleteData} from "../actions/apiRequests";
import {setWizardNavigation} from "../actions/filters";


const mapStateToProps = ({meteogrounds, filters, meteoposts}) => {
    return {
        meteogrounds,
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
const MeteoGroundsContainer = connect(mapStateToProps, mapDispatchToProps)(MeteoGroundsComponent);


export default MeteoGroundsContainer;
