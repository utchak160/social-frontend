import React, {useEffect} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCurrentProfile} from "../../store/actions/profile.action";


const Dashboard = ({auth, profile, getCurrentProfile}) => {
    useEffect(() => {
        getCurrentProfile()
    }, []);

    return (
        <section className="container">
            <h1>This is the User Dashboard</h1>
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
