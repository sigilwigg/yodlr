// ----- [///// CONFIG /////] -----
const INITIAL_STATE = {
    isLoggedIn: false,
    usersList: [],
    error: false
}


// ----- [///// REDUCER /////] -----
function users(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isLoggedIn: true };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                usersList: [],
                error: false
            };
        case 'ERROR':
            return { ...state, error: true };
        default:
            return state;
    }
}


// ----- [///// EXPORTS /////] -----
export default users;