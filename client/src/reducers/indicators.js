const defaultState = [];

const indicators = (state = defaultState, action) =>{
    switch (action.type) {
        case 'GET_INDICATORS_FULFILLED': {
            return action.payload
        }
        case 'CREATE_INDICATOR_FULFILLED': {
            return action.payload ? [...state, action.payload] : state
        }
        case 'EDIT_INDICATOR_FULFILLED': {
            return action.payload ? state.map(item => {
                if (item.timestamp === action.payload.timestamp) {
                    return Object.assign({}, item, action.payload)
                }
                return item;
            }) : state
        }
        case 'DELETE_INDICATOR_FULFILLED': {
            return action.payload ? state.filter(item => action.payload.timestamp !== item.timestamp) : state
        }

        default:
            return state;
    }
};

export default indicators
