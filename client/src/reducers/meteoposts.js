const defaultState = [];

const meteoposts = (state = defaultState, action) =>{
    switch (action.type) {
        case 'GET_METEO_POSTS_FULFILLED': {
            return action.payload
        }
        case 'GET_METEO_POSTS_AND_EMPLOYEES_FULFILLED': {
            return action.payload.meteo_posts
        }
        case 'CREATE_METEO_POST_FULFILLED': {
            return action.payload ? [...state, action.payload] : state
        }
        case 'EDIT_METEO_POST_FULFILLED': {
            return action.payload ? state.map(item => {
                if (item.name === action.payload.name) {
                    return Object.assign({}, item, action.payload)
                }
                return item;
            }) : state
        }
        case 'DELETE_METEO_POST_FULFILLED': {
            return action.payload ? state.filter(item => action.payload.name !== item.name) : state
        }
        case 'LOGOUT': {
            return defaultState
        }

        default:
            return state;
    }
};

export default meteoposts
