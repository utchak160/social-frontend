import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const AlertBar = ({alerts}) => {
    const classes = useStyles();
    return (
        alerts !== null &&
        alerts.length > 0 &&
        alerts.map(alert => (
            <div key={alert.id} className={classes.root}>
                <Alert severity={alert.alertType}>{alert.msg}</Alert>
            </div>
        ))
    );
}

Alert.propType = {
    alerts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(AlertBar);
