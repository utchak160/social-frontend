import {
    REGISTER_SENT,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOAD_USER,
    AUTH_ERROR,
    LOGIN_SENT,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    CLEAR_PROFILE
} from "../../utils/actions.types";
import axios from 'axios';
import {setAlert} from "./alert.action";
import {localStorageService} from "../../services/localStorage.service";
import {apiService} from "../../services/api.service";
// axios.defaults.baseURL = 'http://localhost:5000/api/';

//Load User
export const loadUser = () => async dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
        localStorageService.setToken(token);
    }

    try {
        // const res = await axios.get('user', config);
        const res = await apiService.get('user', '', true )
            dispatch({
                type: LOAD_USER,
                payload: res
            })
    } catch (e) {
        dispatch({
            type: AUTH_ERROR
        })
        dispatch(setAlert('Unauthorized', 'error'))
    }
}

//Register User
export const register = ({name, email, password}) => async dispatch => {
    dispatch({
        type: REGISTER_SENT
    });
    const body = JSON.stringify({name, email, password});
    try {
        // const res = await axios.post('auth/register', body, config)
        const res = await apiService.post('auth/register', body);
        console.log(res);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res
        })

        dispatch(loadUser());
    } catch (e) {
        console.log('[err]', e);
        const error = e.response.data.errors;
        console.log(error);
        if (error) {
            error.forEach(err => dispatch(setAlert(err.msg, 'error')))
        }
        dispatch({
            type: REGISTER_FAILED
        });
    }
}

//Login User
export const login = ({email, password}) => async dispatch => {
    dispatch({
        type: LOGIN_SENT
    });
    const body = JSON.stringify({email, password});
    try {
        // const res = await axios.post('auth/login', body, config)
        const res = await apiService.post('auth/login', body);
        console.log(res);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res
        })

        dispatch(loadUser());
    } catch (e) {
        console.log('[err]', e);
        const error = e.response.data.errors;
        console.log(error);
        if (error) {
            error.forEach(err => dispatch(setAlert(err.msg, 'error')))
        }
        dispatch({
            type: LOGIN_FAILED
        });
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
    dispatch({
        type: CLEAR_PROFILE
    });
    dispatch(setAlert('Logout Successfully', 'success'))
}
