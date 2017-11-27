import React from 'react';
import {withStyles} from 'material-ui/styles';
import {Paper} from "material-ui";

const styles = theme => ({
    root: {}
});

const Module = (props) => {
    const {children, classes} = props;

    return (
        <Paper className={classes.root}>
            {children}
        </Paper>
    );
};


export default withStyles(styles)(Module);