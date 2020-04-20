import {connect} from 'react-redux';
import IndicatorsComponent from '../components/IndicatorsComponent';
import {createData, editData, deleteData} from "../actions/apiRequests";


const mapStateToProps = ({indicators, devices, filters}) => {
    return {
        indicators,
        devices,
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
const IndicatorsContainer = connect(mapStateToProps, mapDispatchToProps)(IndicatorsComponent);


export default IndicatorsContainer;
