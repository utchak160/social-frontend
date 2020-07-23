import {REGISTER_SENT, REGISTER_SUCCESS, REGISTER_FAILED, LOAD_USER, AUTH_ERROR} from "../../utils/actions.types";
import axios from 'axios';
import {setAlert} from "./alert.action";
import {localStorageService} from "../../services/localStorage.service";

//Load User
export const loadUser = () => async dispatch => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    axios.defaults.baseURL = 'http://localhost:5000/api/';
    if (token) {
        localStorageService.setToken(token);
    }

    try {
        const res = await axios.get('user', config);
            dispatch({
                type: LOAD_USER,
                payload: res.data
            })
    } catch (e) {
        console.log(e);
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//Register User
export const register = ({name, email, password}) => async dispatch => {
    axios.defaults.baseURL = 'http://localhost:5000/api/';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    dispatch({
        type: REGISTER_SENT
    });
    const body = JSON.stringify({name, email, password});
    try {
        const res = await axios.post('auth/register', body, config)
        console.log(res);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
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
