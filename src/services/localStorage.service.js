import {AUTH_TOKEN} from "../utils/constants";

class LocalStorageService {

    getToken() {
        const value = localStorage.getItem(AUTH_TOKEN);
        return {
            value
        };
    }

    removeToken() {
        localStorage.removeItem(AUTH_TOKEN);
    }

    setToken(token) {
        localStorage.setItem(AUTH_TOKEN, token);
    }
}

export const localStorageService = new LocalStorageService();
