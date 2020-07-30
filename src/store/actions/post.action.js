import {GET_POSTS, POST_ERROR, DELETE_POST, UPDATE_LIKES, UPDATE_COMMENTS, DELETE_COMMENT} from "../../utils/actions.types";
import axios from 'axios'
import {setAlert} from "./alert.action";

axios.defaults.baseURL = 'http://localhost:5000/api/';

//get All Posts
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

//Add Like
export const addLike = postId => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    try {
        const res = await axios.put(`post/like/${postId}`, config);

        dispatch({
            type: UPDATE_LIKES,
            payload: {id: postId, likes: res.data}
        });
        dispatch(setAlert('Post Liked', 'success', 500));
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
}


//Remove Like
export const removeLike = postId => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    try {
        const res = await axios.put(`post/unlike/${postId}`, config);

        dispatch({
            type: UPDATE_LIKES,
            payload: {id: postId, likes: res.data}
        });
        dispatch(setAlert('Post UnLiked', 'error', 500));
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
}
