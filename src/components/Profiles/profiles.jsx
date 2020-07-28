import React, {useEffect, Fragment} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from "../Shared/Spinner/spinner";
import {getProfiles} from "../../store/actions/profile.action";
import ProfileItem from "./profile-item";

const Profiles = ({getProfiles, profile: {profiles, loading}}) => {
    useEffect(() => {
        getProfiles();
    }, []);

    return (
        <Fragment>
            {loading ? <Spinner /> : <Fragment>
                <section className="container">
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop" /> Browse and connect with developers
                    </p>
                    <div className="profiles">
                        {profiles.length > 0 ? (
                            profiles.map((profile) => (
                                <ProfileItem key={profile._id} profile={profile} />
                            ))
                        ) : <h4>No profiles found...</h4>}
                    </div>
                </section>
            </Fragment>}
        </Fragment>
    )
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles);
