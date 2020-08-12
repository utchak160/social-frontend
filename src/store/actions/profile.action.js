import {
    GET_PROFILE,
    PROFILE_ERROR,
    PROFILE_SENT,
    PROFILE_ADDED,
    PROFILE_UPDATED,
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILES,
    GET_REPOS
} from '../../utils/actions.types';
import {apiService} from "../../services/api.service";
import {setAlert} from "./alert.action";


//Get current user profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await apiService.get('profile/me', {}, true);
        dispatch({
            type: GET_PROFILE,
            payload: res
        })
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

//Get profiles
export const getProfiles = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    });
    try {
        const res = await apiService.get('profile/all', {});

        dispatch({
            type: GET_PROFILES,
            payload: res
        })
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

//Get profile by ID
export const getProfileById = (userId) => async dispatch => {
    console.log(userId)
    try {
        const res = await apiService.get(`profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res
        })
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

//Get user repo
export const getGithubRepos = (username) => async dispatch => {
    try {
        const res = await apiService.get(`profile/github/${username}`);
        console.log(res);
        dispatch({
            type: GET_REPOS,
            payload: res
        })
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

//Add Profiles
export const addProfile = (formData, history, edit = false) => async dispatch => {
    dispatch({
        type: PROFILE_SENT
    })
    const body = JSON.stringify(formData);
    try {
        const res = await apiService.post('profile', body);
        console.log(res);
        dispatch({
            type: PROFILE_ADDED,
            payload: res
        });
        dispatch(setAlert(edit ? 'Profiles Updated' : 'Profiles Created', 'success'));
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
    dispatch({
        type: PROFILE_SENT
    })
    const body = JSON.stringify(formData);
    try {
        const res = await apiService.put('profile/experience', body);
        console.log(res);
        dispatch({
            type: PROFILE_UPDATED,
            payload: res
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
    dispatch({
        type: PROFILE_SENT
    })
    const body = JSON.stringify(formData);
    try {
        const res = await apiService.put('profile/education', body);
        console.log(res);
        dispatch({
            type: PROFILE_UPDATED,
            payload: res
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


//Delete Experience
export const deleteExperience = (id) => async dispatch => {
    dispatch({
        type: PROFILE_SENT
    })
    try {
        const res = await apiService.delete(`profile/experience/${id}`);
        console.log(res);
        dispatch({
            type: PROFILE_UPDATED,
            payload: res
        });
        dispatch(setAlert('Experience Deleted', 'success'));
        getCurrentProfile();
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

//Delete Education
export const deleteEducation = (id) => async dispatch => {
    dispatch({
        type: PROFILE_SENT
    })
    try {
        const res = await apiService.delete(`profile/education/${id}`);
        console.log(res);
        dispatch({
            type: PROFILE_UPDATED,
            payload: res
        });
        dispatch(setAlert('Education Deleted', 'success'));
        getCurrentProfile();
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}

//Delete Account
export const deleteAccount = () => async dispatch => {
    try {
        if (window.confirm('Are you sure? This will permanently DELETE your account')) {
            dispatch({
                type: PROFILE_SENT
            });
            const res = await apiService.delete('profile', true);
            console.log(res);
            dispatch({
                type: ACCOUNT_DELETED,
            });
            dispatch(CLEAR_PROFILE);
            dispatch(setAlert('Account Deleted', 'info'));
        } else {
            return '';
        }
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        })
    }
}
