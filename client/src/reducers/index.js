import {combineReducers} from 'redux';
import filters from "./filters";
import spinner from "./spinner";
import stations from "./stations";
import meteoposts from "./meteoposts";
import employees from "./employees";
import meteogrounds from "./meteogrounds";
import transport from "./transport";
import meteopoles from "./meteopoles";
import devices from "./devices";
import indicators from "./indicators";
import {reducer as toastr} from "react-redux-toastr";

const meteoStation = combineReducers({
    filters,
    stations,
    meteoposts,
    employees,
    meteogrounds,
    transport,
    meteopoles,
    devices,
    indicators,
    spinner,
    toastr
});

export default meteoStation;
