import {connect} from 'react-redux';
import DevicesComponent from '../components/DevicesComponent';
import {createData, editData, deleteData} from "../actions/apiRequests";
import {setWizardNavigation} from "../actions/filters";


const mapStateToProps = ({devices, filters}) => {
    return {
        devices,
        wizNav: filters.wizNav
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
const DevicesContainer = connect(mapStateToProps, mapDispatchToProps)(DevicesComponent);


export default DevicesContainer;
