import {GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, PROFILE_SENT, PROFILE_ADDED, PROFILE_UPDATED} from '../../utils/actions.types';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    profileLoaded: false,
    error: null
}

const profileReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case GET_PROFILE:
        case PROFILE_UPDATED:
            return {
                ...state,
                profile: payload,
                loading: false,
                profileLoaded: true,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                profile: null,
                loading: false,
                profileLoaded: false,
                error: payload
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false,
                profileLoaded: false,
                error: null
            }
        case PROFILE_SENT:
            return {
                ...state,
                loading: true
            };
        case PROFILE_ADDED:
            return {
                ...state,
                loading: false,
                profile: payload,
                profileLoaded: true
            };
        default:
            return state;
    }
}

export default profileReducer;
