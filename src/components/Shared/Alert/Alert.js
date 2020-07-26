import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

// const AlertBar = ({alerts}) => {
//     const classes = useStyles();
//     return (
//         alerts !== null &&
//         alerts.length > 0 &&
//         alerts.map(alert => (
//             <div key={alert.id} className={classes.root}>
//                 <Alert severity={alert.alertType}>{alert.msg}</Alert>
//             </div>
//         ))
//     );
// }


const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomizedSnackbars = ({alerts}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        alerts !== null &&
        alerts.length > 0 &&
        alerts.map(alert => (
            <div key={alert.id} className={classes.root}>
                <Snackbar open={open} autoHideDuration={2000} onClose={(event, reason) => handleClose(event, reason)}>
                    <Alert onClose={(e) => handleClose(e)} severity={alert.alertType}>
                        {alert.msg}
                    </Alert>
                </Snackbar>
                {/*<Alert severity="error">This is an error message!</Alert>*/}
                {/*<Alert severity="warning">This is a warning message!</Alert>*/}
                {/*<Alert severity="info">This is an information message!</Alert>*/}
                {/*<Alert severity="success">This is a success message!</Alert>*/}
            </div>
        ))
    );
}

CustomizedSnackbars.propType = {
    alerts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(CustomizedSnackbars);
