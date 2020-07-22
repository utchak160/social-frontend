import axios from 'axios';
import {localStorageService} from "./localStorage.service";
import {from} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export class ApiService {

    static _instance;

    constructor() {
        axios.defaults.baseURL = 'http:localhost:5000/api/';
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new ApiService();
        }
        return this._instance;
    }

    get(endPoint, params, useAuthHeader = false) {
        const config = {
            headers: this._buildHeader(useAuthHeader),
            params
        };
        return from(axios.get(endPoint, config))
            .pipe(
                tap(res => console.log(res)),
                map(res => res.data),
                catchError(this._handleError)
            );
    }

    post(endPoint, body, useAuthHeader = false) {
        const config = {
            headers: this._buildHeader(useAuthHeader),
        };
        return from(axios.post(endPoint, body, config))
            .pipe(
                tap(res => console.log(res)),
                map(res => res.data),
                catchError(this._handleError)
            );
    }

    put(endPoint, body, useAuthHeader = false) {
        const config = {
            headers: this._buildHeader(useAuthHeader),
        };
        return from(axios.post(endPoint, body, config))
            .pipe(
                tap(res => console.log(res)),
                map(res => res.data),
                catchError(this._handleError)
            );
    }

    delete(endPoint, useAuthHeader = false) {
        const config = {
            headers: this._buildHeader(useAuthHeader),
        };
        return from(axios.delete(endPoint, config))
            .pipe(
                tap(res => console.log(res)),
                map(res => res.data),
                catchError(this._handleError)
            );
    }

    _buildHeader(useAuthHeaders) {
        let headers = {contentType: 'application/json'}
        if (useAuthHeaders) {
            headers = {
                ...headers,
                authorization: `Bearer ${localStorageService.getToken()}`
            };
        }
        return headers;
    }

    _handleError(error) {
        //@Todo Handle error as per the response from backend
        return catchError(error);
    }
}
