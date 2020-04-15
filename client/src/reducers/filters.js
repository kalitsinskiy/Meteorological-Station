import Cookies from "js-cookie"

const defaultState = {
    isDBAvailable: !!Cookies.getJSON("isDBAvailable"),
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
                isDBAvailable: action.payload
            });
        }
        case 'SET_WIZARD_NAVIGATION': {
            return Object.assign({}, state, {
                wizNav: action.payload
            });
        }

        default:
            return state;
    }
};

export default filters;
