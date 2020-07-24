import React, {Component} from "react";
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const AuthRoute = ({component: Component, auth: {isAuthenticated, loading}, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            !isAuthenticated && !loading ?
                (
                    <Redirect to='/login'/>
                ) : (
                    <Component {...props} />
                )
        }
    />
);

AuthRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AuthRoute);
