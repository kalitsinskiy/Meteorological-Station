import {connect} from 'react-redux';
import EmployeesComponent from '../components/EmployeesComponent';
import {createData, editData, deleteData, getComplexSelection} from "../actions/apiRequests";
import {setWizardNavigation} from "../actions/filters";


const mapStateToProps = ({employees, filters}) => {
    return {
        employees,
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
const EmployeesContainer = connect(mapStateToProps, mapDispatchToProps)(EmployeesComponent);


export default EmployeesContainer;
