import {GET_PROFILE, PROFILE_ERROR} from '../../utils/actions.types';
import axios from 'axios';
import {setAlert} from "./alert.action";

axios.defaults.baseURL = 'http://localhost:5000/api/';

//Get current user profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}
