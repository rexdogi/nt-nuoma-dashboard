import * as React from 'react';
import {Paper, withStyles} from 'material-ui';
import {compose} from "redux";

const AuthForm = (props) => {
    const {classes} = props;
    return (
        <Paper className={classes.wrapper}>
            <div className={classes.header}>
                <div className={classes.logo}>NT</div>
            </div>
            <div className={classes.childrenContainer}>
                {props.children}
            </div>
        </Paper>
    )
};

const styles = theme => ({
    wrapper: {
        maxWidth: '400px',
        margin: '0 auto',
        height: '600px',
    },

    logo: {
        position: 'relative',
        textAlign: 'center',
        top: '50%',
        fontSize: '2em',
        color: 'white'
    },

    header: {
        height: '200px',
        backgroundColor: theme.palette.primary[700]
    },

    childrenContainer: {
        height: '400px',
        position: 'relative',
        padding: theme.spacing.unit
    }

});

export default compose(
    withStyles(styles, {name: 'Register'}),
)(AuthForm)