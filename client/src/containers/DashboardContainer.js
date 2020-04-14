import {connect} from 'react-redux';
import Dashboard from '../components/Dashboard';
import {getData, createData, editData, deleteData} from "../actions/apiRequests";


const mapStateToProps = ({stations}) => {
    return {
        stations
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getData: (table, type) => dispatch(getData(table, type)),
        createData: (options, data, type) => dispatch(createData(options, data, type)),
        editData: (options, data, type) => dispatch(editData(options, data, type)),
        deleteData: (options, type) => dispatch(deleteData(options, type)),
    }
};
const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);


export default DashboardContainer;
