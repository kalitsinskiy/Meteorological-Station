import {connect} from 'react-redux';
import TransportComponent from '../components/TransportComponent';
import {createData, editData, deleteData} from "../actions/apiRequests";
import {setWizardNavigation} from "../actions/filters";


const mapStateToProps = ({transport, filters, meteoposts}) => {
    return {
        transport,
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
const TransportContainer = connect(mapStateToProps, mapDispatchToProps)(TransportComponent);


export default TransportContainer;
