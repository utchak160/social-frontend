import {
    GET_POSTS,
    POST_ERROR,
    DELETE_POST,
    UPDATE_LIKES,
    UPDATE_COMMENTS,
    DELETE_COMMENT,
    ADD_POST, GET_POST
} from "../../utils/actions.types";
import {apiService} from "../../services/api.service";
import {setAlert} from "./alert.action";

//get All Posts
export const getAllPosts = () => async dispatch => {

    try {
        const res = await apiService.get('post', {}, true);
        dispatch({
            type: GET_POSTS,
            payload: res
        });
        dispatch(setAlert('Posts fetched', 'success', 500));
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
}

//Get post
export const getPost = (id) => async dispatch => {

    try {
        const res = await apiService.get(`post/${id}`);

        dispatch({
            type: GET_POST,
            payload: res
        });
        dispatch(setAlert('Posts Fetched', 'success', 500));
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
}

//Add Like
export const addLike = postId => async dispatch => {

    try {
        const res = await apiService.put(`post/like/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {id: postId, likes: res}
        });
        dispatch(setAlert('Posts Liked', 'success', 500));
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
}


//Remove Like
export const removeLike = postId => async dispatch => {

    try {
        const res = await apiService.put(`post/unlike/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {id: postId, likes: res}
        });
        dispatch(setAlert('Posts UnLiked', 'error', 500));
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
}

//add or update Comment
export const addComment = (postId, body) => async dispatch => {

    try {
        const res = await apiService.put(`post/comment/${postId}`, body);

        dispatch({
            type: UPDATE_COMMENTS,
            payload: res
        });
        dispatch(setAlert('Comment Added', 'success', 500));
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
}


//delete comment
export const deleteComment = (postId, commentId) => async dispatch => {

    try {
        await apiService.delete(`post/comment/${postId}/${commentId}`);
        dispatch({
            type: DELETE_COMMENT,
            payload: commentId
        });
        dispatch(setAlert('Comment Deleted', 'error', 500));
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
}


//delete post
export const deletePost = (postId) => async dispatch => {

    try {
        await apiService.delete(`post/${postId}`);
        dispatch({
            type: DELETE_POST,
            payload: postId
        });
        dispatch(setAlert('Posts Deleted', 'error', 500));
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
}


//Add post
export const addPost = (formData) => async dispatch => {

    try {
        const res = await apiService.post('post/add', formData);
        dispatch({
            type: ADD_POST,
            payload: res
        });
        dispatch(setAlert('Posts Added', 'success', 500));
    } catch (e) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: e.response.statusText, status: e.response.status}
        });
    }
}
