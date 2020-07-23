import {ApiService} from "../services/api.service";
import {localStorageService} from "../services/localStorage.service";
import {connect} from 'react-redux';

class AuthController {

    apiService = ApiService.getInstance();

    login(user) {
        this.apiService.post('auth/login', user, true)
            .subscribe((res) => {
                localStorageService.setToken(res)
            });
    }

    register(user) {
        this.apiService.post('auth/register', user, true)
            .subscribe((res) => {
            })
    }
}

const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps)(AuthController);
