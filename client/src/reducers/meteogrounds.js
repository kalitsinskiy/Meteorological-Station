const defaultState = [];

const meteogrounds = (state = defaultState, action) =>{
    switch (action.type) {
        case 'GET_METEO_GROUNDS_FULFILLED': {
            return action.payload
        }
        case 'GET_METEO_GROUNDS_AND_TRANSPORT_FULFILLED': {
            return action.payload.meteo_grounds
        }
        case 'CREATE_METEO_GROUND_FULFILLED': {
            return action.payload ? [...state, action.payload] : state
        }
        case 'EDIT_METEO_GROUND_FULFILLED': {
            return action.payload ? state.map(item => {
                if (item.name === action.payload.name) {
                    return Object.assign({}, item, action.payload)
                }
                return item;
            }) : state
        }
        case 'DELETE_METEO_GROUND_FULFILLED': {
            return action.payload ? state.filter(item => action.payload.name !== item.name) : state
        }
        case 'LOGOUT': {
            return defaultState
        }

        default:
            return state;
    }
};

export default meteogrounds
