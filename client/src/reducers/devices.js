const defaultState = [];

const devices = (state = defaultState, action) =>{
    switch (action.type) {
        case 'GET_DEVICES_FULFILLED': {
            return action.payload
        }
        case 'CREATE_DEVICE_FULFILLED': {
            return action.payload ? [...state, action.payload] : state
        }
        case 'EDIT_DEVICE_FULFILLED': {
            return action.payload ? state.map(item => {
                if (item.name === action.payload.name) {
                    return Object.assign({}, item, action.payload)
                }
                return item;
            }) : state
        }
        case 'DELETE_DEVICE_FULFILLED': {
            return action.payload ? state.filter(item => action.payload.name !== item.name) : state
        }

        default:
            return state;
    }
};

export default devices
