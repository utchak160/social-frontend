import React, {useEffect, Fragment} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from "../Shared/Spinner/spinner";
import {getCurrentProfile} from "../../store/actions/profile.action";


const Dashboard = ({auth: {user}, profile: {profile, loading}, getCurrentProfile}) => {
    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile]);


    return loading && profile === null ? <Spinner/> : (
        <section className="container">
            <h1 className="large text-primary">This is the User Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"/>{' '}Welcome {user && user.name}
            </p>
            {profile !== null ? (
                    <p>has</p>
                ) :
                (
                    <Fragment>
                        <p>Your profile is not added yet! Do create one</p>
                        <Link to='/create-profile' className="btn btn-primary my-1">
                            Create Profile
                        </Link>
                    </Fragment>
                )}
        </section>
    );
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);
