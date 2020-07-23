import axios from 'axios';

class LocalStorageService {

    getToken() {
        let token = localStorage.getItem('token');
        if (token) {
            return token;
        } else {
            return '';
        }
    }

    removeToken() {
        localStorage.removeItem('token');
        delete axios.defaults.headers.authorization;
    }

    setToken(token) {
        if (token) {
            localStorage.setItem('token', token);
            axios.defaults.headers.authorization = `Bearer ${token}`;
        }
    }
}

export const localStorageService = new LocalStorageService();
