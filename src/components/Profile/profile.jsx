import React, {Fragment, useEffect} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getProfileById} from "../../store/actions/profile.action";
import Spinner from "../Shared/Spinner/spinner";
import ProfileInfo from "./profile-info";
import ProfileAbout from "./profile-about";
import ProfileExperience from "./profile-experience";
import ProfileEducation from "./profile-education";
import GithubRepos from "./github-repos";

const Profile = ({match, getProfileById, profile: {loading, profile}, auth}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id])
    return (
        <Fragment>
            {profile === null || loading ? <Spinner/> : (<Fragment>
                <section className="container">
                    <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id &&
                    (
                        <Link to='/edit-profile' className='btn btn-dark'>
                            Edit Profile
                        </Link>
                    )}
                    <div className="profile-grid my-1">
                        <ProfileInfo profile={profile}/>
                        <ProfileAbout profile={profile}/>

                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            {profile.experience.length === 0 ? ('No experience added') : (<Fragment>
                                {profile.experience.map(exp => (
                                    <ProfileExperience key={exp._id} experience={exp}/>
                                ))}
                            </Fragment>)}
                        </div>


                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {profile.education.length === 0 ? ('No education added') : (
                                <Fragment>
                                    {profile.education.map(edu => (
                                        <ProfileEducation key={edu._id} education={edu}/>
                                    ))}
                                </Fragment>
                            )}
                        </div>
                        {profile.githubusername && <GithubRepos/>}
                    </div>
                </section>
            </Fragment>)}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {getProfileById})(Profile);
