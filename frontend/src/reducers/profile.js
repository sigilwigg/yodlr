// ----- [///// CONFIG /////] -----
const INITIAL_STATE = {
    isLoggedIn: false,
    id: 0,
    usersList: [],
    firstName: '',
    lastName: '',
    email: '',
    isAdmin: false,
    state: '',
    error: false
}


// ----- [///// REDUCER /////] -----
function profile(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_PROFILE_DATA':
            return {
                ...state,
                id: action.id,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                isAdmin: action.isAdmin,
                state: action.state,
                usersList: action.usersList
            }
        case 'LOGIN':
            return { ...state, isLoggedIn: true };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                id: 0,
                usersList: [],
                error: false,
                firstName: '',
                lastName: '',
                email: '',
                isAdmin: false,
                state: '',
            };
        case 'ERROR':
            return { ...state, error: true };
        default:
            return state;
    }
}


// ----- [///// EXPORTS /////] -----
export default profile;