import {GET_PROFILE, PROFILE_ERROR} from '../../utils/actions.types';

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    profileLoaded: false,
    error: null
}

const profileReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case GET_PROFILE:
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
        default:
            return state;
    }
}

export default profileReducer;
