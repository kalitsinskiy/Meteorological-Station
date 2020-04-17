export const setWizardNavigation = obj =>{
    return {
        type: 'SET_WIZARD_NAVIGATION',
        payload: obj
    };
};

export const logout = () =>{
    return {
        type: 'LOGOUT',
    };
};
