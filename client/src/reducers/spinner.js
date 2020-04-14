const spinner = (state = 0, {type}) => {
    switch (type) {
        case (type.match(/_PENDING$/) || {}).input:
            return state + 1;
        case (type.match(/_FULFILLED$/) || {}).input:
            return state - 1;
        case (type.match(/_REJECTED$/) || {}).input:
            return state - 1;
        case 'STOP_SPINNER':
            return 0;
        default:
            return state;
    }
};
export default spinner;
