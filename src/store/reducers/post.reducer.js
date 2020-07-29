import {GET_POSTS, POST_ERROR} from "../../utils/actions.types";

const initialState = {
    post: null,
    posts: [],
    loading: true,
    error: null
}

const postReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            };
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}

export default postReducer;
