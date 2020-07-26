import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Navbar from './components/Shared/Navbar/Navbar';
import Landing from "./components/Landing/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/Shared/Alert/Alert";
import CreateProfile from "./components/profile-form/createProfile";

//Redux
import {Provider} from 'react-redux';
import store from './store/store';
import {localStorageService} from "./services/localStorage.service";
import {loadUser} from "./store/actions/auth.action";
import Dashboard from "./components/dashboard/dashboard";
import AuthRoute from "./guards/auth.guard";

const token = localStorageService.getToken();
if (token) {
    localStorageService.setToken(token);
}

const App = () => {

    useEffect(() => {
        store.dispatch(loadUser());
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar/>
                    <Route exact path="/" component={Landing}/>
                    <Alert />
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <AuthRoute exact path="/dashboard" component={Dashboard} />
                        <AuthRoute exact path="/create-profile" component={CreateProfile} />
                    </Switch>
                </Fragment>
            </Router>
        </Provider>
    );
}

export default App;
