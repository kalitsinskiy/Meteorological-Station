const defaultState = [];

const transport = (state = defaultState, action) =>{
    switch (action.type) {
        case 'GET_TRANSPORT_FULFILLED': {
            return action.payload
        }
        case 'GET_METEO_GROUNDS_AND_TRANSPORT_FULFILLED': {
            return action.payload.transport
        }
        case 'CREATE_TRANSPORT_FULFILLED': {
            return action.payload ? [...state, action.payload] : state
        }
        case 'EDIT_TRANSPORT_FULFILLED': {
            return action.payload ? state.map(item => {
                if (item.number === action.payload.number) {
                    return Object.assign({}, item, action.payload)
                }
                return item;
            }) : state
        }
        case 'DELETE_TRANSPORT_FULFILLED': {
            return action.payload ? state.filter(item => action.payload.number !== item.number) : state
        }

        default:
            return state;
    }
};

export default transport
