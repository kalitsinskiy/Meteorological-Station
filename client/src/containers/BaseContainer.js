import {connect} from 'react-redux';
import BaseComponent from '../components/BaseComponent';
// import {getCurrentSession,getMall_by_allMalls, getMall} from "../actions/dbRequests";


const mapStateToProps = ({filters, user}) => {
    return {
        // user,
        // role: filters.role,
        // newUser: filters.newUser,
        // isOpenSidebarMenu: filters.isOpenSidebarMenu,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // getCurrentSession: () => dispatch(getCurrentSession()),
        // getMall_by_allMalls: (params) => dispatch(getMall_by_allMalls(params)),
        // getMall: (id, options) => dispatch(getMall(id, options)),
    }
};
const BaseContainer = connect(mapStateToProps, mapDispatchToProps)(BaseComponent);

export default BaseContainer;
