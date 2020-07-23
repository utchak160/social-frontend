import {REGISTER_SENT, REGISTER_SUCCESS, REGISTER_FAILED} from "../../utils/actions.types";
import {localStorageService} from '../../services/localStorage.service';

const initialState = {
    token: localStorageService.getToken(),
    isAuthenticated: null,
    loading: null,
    user: null
}

const authReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case REGISTER_SENT:
            return {
                ...state,
                loading: true
            }
        case REGISTER_SUCCESS:
            localStorageService.setToken(payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: true
            };
        case REGISTER_FAILED:
            localStorageService.removeToken();
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }
}

export default authReducer;
