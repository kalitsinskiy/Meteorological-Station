const defaultState = [];

const meteopoles = (state = defaultState, action) =>{
    switch (action.type) {
        case 'GET_METEO_POLES_FULFILLED': {
            return action.payload
        }
        case 'CREATE_METEO_POLE_FULFILLED': {
            return action.payload ? [...state, action.payload] : state
        }
        case 'EDIT_METEO_POLE_FULFILLED': {
            return action.payload ? state.map(item => {
                if (item.name === action.payload.name) {
                    return Object.assign({}, item, action.payload)
                }
                return item;
            }) : state
        }
        case 'DELETE_METEO_POLE_FULFILLED': {
            return action.payload ? state.filter(item => action.payload.name !== item.name) : state
        }
        case 'LOGOUT': {
            return defaultState
        }

        default:
            return state;
    }
};

export default meteopoles
