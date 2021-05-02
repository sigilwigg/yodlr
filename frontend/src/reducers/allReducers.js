import { combineReducers } from 'redux';
import profile from './profile';


const allReducers = combineReducers({
    profile: profile
})

export default allReducers;