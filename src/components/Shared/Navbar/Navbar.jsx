import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from "../../../store/actions/auth.action";

const Navbar = ({auth: {isAuthenticated, loading}, user, logout}) => {
    const authLinks = (
        <ul>
            <li>
                <span className='hide-sm'>Hello, {!loading && (isAuthenticated ? user.name : 'user' )}</span>
            </li>
            <li>
                <Link onClick={logout} to='/login'>
                    <i className='fas fa-sign-out-alt'/>{'  '}
                    <span className='hide-sm'>Logout</span>
                </Link>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li><Link to="#!">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"/> DevConnector</Link>
            </h1>
            { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>
    );
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    user: PropTypes.object,
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.auth.user
})

export default connect(mapStateToProps, {logout})(Navbar)
