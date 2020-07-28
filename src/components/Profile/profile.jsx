import React, {Fragment, useEffect} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getProfileById} from "../../store/actions/profile.action";
import Spinner from "../Shared/Spinner/spinner";
import ProfileInfo from "./profile-info";
import ProfileAbout from "./profile-about";

const Profile = ({match, getProfileById, profile: {loading, profile} }) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id])
    return (
        <Fragment>
            {loading ? <Spinner /> : (<Fragment>
                <section className="container">
                    <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>

                    <div className="profile-grid my-1">
                        <ProfileInfo profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            <div>
                                <h3 className="text-dark">Microsoft</h3>
                                <p>Oct 2011 - Current</p>
                                <p><strong>Position: </strong>Senior Developer</p>
                                <p>
                                    <strong>Description: </strong>Lorem ipsum dolor sit amet
                                    consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
                                    ipsam, sapiente suscipit dicta eius velit amet aspernatur
                                    asperiores modi quidem expedita fugit.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-dark">Sun Microsystems</h3>
                                <p>Nov 2004 - Nov 2011</p>
                                <p><strong>Position: </strong>Systems Admin</p>
                                <p>
                                    <strong>Description: </strong>Lorem ipsum dolor sit amet
                                    consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
                                    ipsam, sapiente suscipit dicta eius velit amet aspernatur
                                    asperiores modi quidem expedita fugit.
                                </p>
                            </div>
                        </div>

                        <!-- Education -->
                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            <div>
                                <h3>University Of Washington</h3>
                                <p>Sep 1993 - June 1999</p>
                                <p><strong>Degree: </strong>Masters</p>
                                <p><strong>Field Of Study: </strong>Computer Science</p>
                                <p>
                                    <strong>Description: </strong>Lorem ipsum dolor sit amet
                                    consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
                                    ipsam, sapiente suscipit dicta eius velit amet aspernatur
                                    asperiores modi quidem expedita fugit.
                                </p>
                            </div>
                        </div>

                        <!-- Github -->
                        <div className="profile-github">
                            <h2 className="text-primary my-1">
                                <i className="fab fa-github"></i> Github Repos
                            </h2>
                            <div className="repo bg-white p-1 my-1">
                                <div>
                                    <h4><a href="#" target="_blank"
                                           rel="noopener noreferrer">Repo One</a></h4>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Repellat, laborum!
                                    </p>
                                </div>
                                <div>
                                    <ul>
                                        <li className="badge badge-primary">Stars: 44</li>
                                        <li className="badge badge-dark">Watchers: 21</li>
                                        <li className="badge badge-light">Forks: 25</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="repo bg-white p-1 my-1">
                                <div>
                                    <h4><a href="#" target="_blank"
                                           rel="noopener noreferrer">Repo Two</a></h4>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Repellat, laborum!
                                    </p>
                                </div>
                                <div>
                                    <ul>
                                        <li className="badge badge-primary">Stars: 44</li>
                                        <li className="badge badge-dark">Watchers: 21</li>
                                        <li className="badge badge-light">Forks: 25</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
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
