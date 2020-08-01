import {
    GET_POSTS,
    POST_ERROR,
    DELETE_POST,
    UPDATE_LIKES,
    UPDATE_COMMENTS,
    DELETE_COMMENT,
    ADD_POST, GET_POST
} from "../../utils/actions.types";

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
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            };
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            };
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case UPDATE_LIKES:
            return {
                ...state,
                loading: false,
                posts: state.posts.map(post => post._id === payload.id ? {...post, likes: payload.likes } : post)
            };
        case UPDATE_COMMENTS:
            return {
                ...state,
                loading: false,
                post: {...state.post, comments: payload}
            };
        case DELETE_COMMENT:
            return {
                ...state,
                loading: false,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(
                        comment => comment._id !== payload
                    )
                }
            };
        case DELETE_POST:
            return {
                ...state,
                loading: false,
                posts: state.posts.filter(post => post._id !== payload)
            };
        default:
            return state;
    }
}

export default postReducer;
