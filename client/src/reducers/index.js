import {combineReducers} from 'redux';
import filters from "./filters";
import spinner from "./spinner";
import stations from "./stations";
import meteoposts from "./meteoposts";
import employees from "./employees";
import {reducer as toastr} from "react-redux-toastr";

const meteoStation = combineReducers({
    filters,
    stations,
    meteoposts,
    employees,
    spinner,
    toastr
});

export default meteoStation;
