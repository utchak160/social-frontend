import React, {useEffect, Fragment} from "react";
import {Link} from 'react-router-dom';
import DashboardAction from "./dashboard-action";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Experience from "./Experience";
import Spinner from "../Shared/Spinner/spinner";
import {getCurrentProfile} from "../../store/actions/profile.action";
import Education from "./Education";
import {deleteAccount} from "../../store/actions/profile.action";


const Dashboard = ({auth: {user}, profile: {profile, loading}, deleteAccount, getCurrentProfile}) => {
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
                    <Fragment>
                        <DashboardAction />
                        <Experience experience={profile.experience} />
                        <Education education={profile.education} />
                        <div className="my-2">
                            <button onClick={() => deleteAccount()} className="btn btn-danger">
                                <i className="fas fa-user-minus" />
                                {' '} Delete My Account
                            </button>
                        </div>
                    </Fragment>
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
    deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);
