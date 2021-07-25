// ----- [///// DEPENDENCIES /////] -----
import YodlrApi from '../api_helpers/yodlr_api';


// ----- [///// ACTION CREATORS /////] -----
export function LogIn({ email, password }) {
    return async function (dispatch) {
        try {
            let { token, id } = await YodlrApi.login(email, password);
            if (!token) throw new Error();
            YodlrApi.token = token;
            await dispatch(setProfileLoggedIn());
            await dispatch(UpdateProfileData(id));
            return ('login success');
        } catch (err) {
            console.log(err.stack);
            await dispatch(gotError());
            return ('login failure');
        }
    }
}

export function LogOut() {
    return async function (dispatch) {
        try {
            YodlrApi.token = undefined;
            await dispatch(setProfileLoggedOut());
            return ('logout success');
        } catch (err) {
            console.log(err.stack);
            await dispatch(gotError());
            return ('logout failure');
        }
    }
}

export function SignUp(registerData) {
    return async function (dispatch) {
        try {
            let { token } = await YodlrApi.register(registerData);
            if (!token) throw new Error();
            YodlrApi.token = token;
            await dispatch(setProfileLoggedIn());
            return ('registration success');
        } catch (err) {
            console.log(err.stack);
            await dispatch(gotError());
            return ('registration failure');
        }
    }
}

export function UpdateProfileData(id) {
    return async function (dispatch) {
        try {
            let user = await YodlrApi.getUser(id);
            let usersList = [];
            if (user.isAdmin === true) {
                usersList = await YodlrApi.getAllUsers();
            }
            await dispatch(setProfileData(user, usersList));
        } catch (err) {
            console.log(err.stack);
            await dispatch(gotError());
        }
    }
}

export function ChangeUserData(id, updateData, profileId) {
    return async function (dispatch) {
        try {
            await YodlrApi.updateUser(id, updateData);
            await dispatch(UpdateProfileData(profileId));
        } catch (err) {
            console.log(err.stack);
            await dispatch(gotError());
        }
    }
}


// ----- [///// DISPATCH HANDLERS /////] -----
export function setProfileLoggedIn() {
    return {
        type: 'LOGIN'
    }
}

export function setProfileLoggedOut() {
    return {
        type: 'LOGOUT'
    }
}

export function setProfileData(user, usersList) {
    let { id, firstName, lastName, email, isAdmin, state } = user;

    return {
        type: 'SET_PROFILE_DATA',
        id: id,
        email: email,
        firstName: firstName,
        lastName: lastName,
        isAdmin: isAdmin,
        state: state,
        usersList: usersList
    }
}

export function gotError() {
    return {
        type: 'ERROR'
    }
}