import {GET_POSTS, POST_ERROR, DELETE_POST, UPDATE_LIKES, UPDATE_COMMENTS, DELETE_COMMENT} from "../../utils/actions.types";

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
        case UPDATE_LIKES:
            return {
                ...state,
                loading: false,
                posts: state.posts.map(post => post._id === payload.id ? {...post, likes: payload.likes } : post)
            }
        case UPDATE_COMMENTS:
            return {
                ...state,
                loading: false,
                posts: state.posts.map(post => post._id === payload.id ? {...post, comments: payload.comments} : post)
            }
        case DELETE_COMMENT:
            return {
                ...state,
                loading: false,
                // posts: state.posts.map(post => post._id === payload.postId ? post.comments.filter(comment => comment._id !== payload.commentId): post)
                posts: state.posts.map(post => post._id === payload.postId ? {...post, comments: payload.comments} : post)
            }
        case DELETE_POST:
            return {
                ...state,
                loading: false,
                posts: state.posts.filter(post => post._id !== payload)
            }
        default:
            return state;
    }
}

export default postReducer;
