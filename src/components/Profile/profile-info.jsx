import React, {Fragment} from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileInfo = ({profile: {user: name, avatar}, status, company, location, website, social: {facebook, youtube,  twitter, instagram, linkedin}}) => {
    return (
        <Fragment>
            <div className="profile-top bg-primary p-2">
                <img
                    className="round-img my-1"
                    src={avatar}
                    alt=""
                />
                <h1 className="large">{name}</h1>
                <p className="lead">{status} {company && <span>at {company}</span>}</p>
                <p>{location && <span>{location}</span>}</p>
                <div className="icons my-1">
                    <Link to={website} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe fa-2x" />
                    </Link>
                    <Link to={twitter} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x" />
                    </Link>
                    <Link to={facebook} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x" />
                    </Link>
                    <Link to={linkedin} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin fa-2x" />
                    </Link>
                    <Link to={youtube} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube fa-2x" />
                    </Link>
                    <Link to={instagram} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x" />
                    </Link>
                </div>
            </div>
        </Fragment>
    );
};

ProfileInfo.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileInfo;
