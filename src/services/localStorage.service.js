import {AUTH_TOKEN} from "../utils/constants";

class LocalStorageService {

    getToken() {
        const value = localStorage.getItem(AUTH_TOKEN);
        if (value) {
            return {
                value
            };
        } else {
            return '';
        }
    }

    removeToken() {
        localStorage.removeItem(AUTH_TOKEN);
    }

    setToken(token) {
        localStorage.setItem(AUTH_TOKEN, `Bearer ${token}`);
    }
}

export const localStorageService = new LocalStorageService();
