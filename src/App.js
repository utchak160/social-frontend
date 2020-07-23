import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Navbar from './components/Shared/Navbar/Navbar';
import Landing from "./components/Landing/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/Shared/Alert/Alert";

//Redux
import {Provider} from 'react-redux';
import store from './store/store';
import {localStorageService} from "./services/localStorage.service";
import {loadUser} from "./store/actions/auth.action";

const token = localStorage.getItem('token');
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
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                    </Switch>
                </Fragment>
            </Router>
        </Provider>
    );
}

export default App;
