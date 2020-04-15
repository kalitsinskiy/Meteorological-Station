const defaultState = [];

const employees = (state = defaultState, action) =>{
    switch (action.type) {
        case 'GET_EMPLOYEES_FULFILLED': {
            return action.payload
        }
        case 'GET_METEO_POSTS_AND_EMPLOYEES_FULFILLED': {
            return action.payload.employees
        }
        case 'CREATE_EMPLOYEES_FULFILLED': {
            return action.payload ? [...state, action.payload] : state
        }
        case 'EDIT_EMPLOYEES_FULFILLED': {
            return action.payload ? state.map(item => {
                if (item.full_name === action.payload.full_name) {
                    return Object.assign({}, item, action.payload)
                }
                return item;
            }) : state
        }
        case 'DELETE_EMPLOYEES_FULFILLED': {
            return action.payload ? state.filter(item => action.payload.full_name !== item.full_name) : state
        }

        default:
            return state;
    }
};

export default employees
