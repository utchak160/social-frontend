import {
    GET_PROFILE,
    PROFILE_ERROR,
    PROFILE_SENT,
    PROFILE_ADDED,
    PROFILE_UPDATED
} from '../../utils/actions.types';
import axios from 'axios';
import {setAlert} from "./alert.action";

axios.defaults.baseURL = 'http://localhost:5000/api/';

//Get current user profile
export const getCurrentProfile = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try {
        const res = await axios.get('profile/me', config);

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

//Add Profile
export const addProfile = (formData, history, edit = false) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    dispatch({
        type: PROFILE_SENT
    })
    const body = JSON.stringify(formData);
    try {
        const res = await axios.post('profile', body, config);
        console.log(res.data);
        dispatch({
            type: PROFILE_ADDED,
            payload: res.data
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
        history.push('/dashboard');
    } catch (e) {
        console.log('[err]', e);
        const error = e.response.data.errors;
        console.log(error);
        if (error) {
            error.forEach(err => dispatch(setAlert(err.msg, 'error')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}


//Add Experience
export const addExperience = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    dispatch({
        type: PROFILE_SENT
    })
    const body = JSON.stringify(formData);
    try {
        const res = await axios.put('profile/experience', body, config);
        console.log(res.data);
        dispatch({
            type: PROFILE_UPDATED,
            payload: res.data
        });
        dispatch(setAlert('Experience added', 'success'));

        history.push('/dashboard');
    } catch (e) {
        console.log('[err]', e);
        const error = e.response.data.errors;
        console.log(error);
        if (error) {
            error.forEach(err => dispatch(setAlert(err.msg, 'error')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

//Add Education
export const addEducation = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    dispatch({
        type: PROFILE_SENT
    })
    const body = JSON.stringify(formData);
    try {
        const res = await axios.put('profile/education', body, config);
        console.log(res.data);
        dispatch({
            type: PROFILE_UPDATED,
            payload: res.data
        });
        dispatch(setAlert('Education added', 'success'));

        history.push('/dashboard');
    } catch (e) {
        console.log('[err]', e);
        const error = e.response.data.errors;
        console.log(error);
        if (error) {
            error.forEach(err => dispatch(setAlert(err.msg, 'error')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}
