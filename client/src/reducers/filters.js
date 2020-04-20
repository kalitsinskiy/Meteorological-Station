import Cookies from "js-cookie"

const defaultState = {
    isDBAvailable: !!Cookies.getJSON("isDBAvailable"),
    isAdmin: !!Cookies.getJSON("isAdmin"),
    pageSize: (window.innerWidth || 1920) > 1366 ? 8 : 5,
    wizNav:{
        location: "meteo_stations",
        prevDisabled: true,
        prevHidden: true,
        nextDisabled: true,
        nextHidden: false,
        nextMessage: "Choose some station"
    }
};

const filters = (state = defaultState, action) =>{
    switch (action.type) {
        case 'LOGIN_FULFILLED': {
            return Object.assign({}, state, {
                isDBAvailable: action.payload.access,
                isAdmin: action.payload.isAdmin,
            });
        }
        case 'SET_WIZARD_NAVIGATION': {
            return Object.assign({}, state, {
                wizNav: action.payload
            });
        }
        case 'LOGOUT': {
            Cookies.remove("isDBAvailable");
            Cookies.remove("isAdmin");
            return Object.assign({}, state, {
                isDBAvailable: false,
                isAdmin: false,
            });
        }

        default:
            return state;
    }
};

export default filters;
