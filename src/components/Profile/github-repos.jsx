import React, {Fragment, useEffect} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getGithubRepos} from "../../store/actions/profile.action";
import {Link} from "react-router-dom";

const GithubRepos = ({profile: {githubusername}, repos, getGithubRepos}) => {
    useEffect(() => {
        getGithubRepos(githubusername)
    }, [getGithubRepos, githubusername])
    return (
        <Fragment>
            <div className="profile-github">
                <h2 className="text-primary my-1">
                    <i className="fab fa-github"/> Github Repos
                </h2>
                {repos.length === 0 ?
                    (<h1>No repos found!</h1>) :
                    <Fragment>
                        {repos.map(repo => (
                            <div key={repo.id} className="repo bg-white p-1 my-1">
                                <div>
                                    <h4><Link to={repo.html_url} target="_blank"
                                              rel="noopener noreferrer">{repo.name}</Link></h4>
                                    <p>
                                        {repo.description && (repo.description)}
                                    </p>
                                </div>
                                <div>
                                    <ul>
                                        <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                                        <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                                        <li className="badge badge-light">Forks: {repo.forks_count}</li>
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </Fragment>
                }
            </div>
        </Fragment>
    );
};

GithubRepos.propTypes = {
    profile: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getGithubRepos: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile.profile,
    repos: state.profile.repos
})

export default connect(mapStateToProps, {getGithubRepos})(GithubRepos);
