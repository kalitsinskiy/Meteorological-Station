import {connect} from 'react-redux';
import EmployeesComponent from '../components/EmployeesComponent';
import {createData, editData, deleteData} from "../actions/apiRequests";


const mapStateToProps = ({employees, stations, meteoposts, filters}) => {
    return {
        employees,
        stations,
        meteoposts,
        pageSize: filters.pageSize,
        isAdmin: filters.isAdmin,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createData: (options, data, type) => dispatch(createData(options, data, type)),
        editData: (options, data, type) => dispatch(editData(options, data, type)),
        deleteData: (options, type) => dispatch(deleteData(options, type))
    }
};
const EmployeesContainer = connect(mapStateToProps, mapDispatchToProps)(EmployeesComponent);


export default EmployeesContainer;
