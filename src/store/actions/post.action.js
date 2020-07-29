import {GET_POSTS, POST_ERROR} from "../../utils/actions.types";
import axios from 'axios'
import {setAlert} from "./alert.action";

axios.defaults.baseURL = 'http://localhost:5000/api/';

export const getAllPosts = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    try {
        const res = await axios.get('post', config);

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
        dispatch(setAlert('Post fetched', 'success'));
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
}
