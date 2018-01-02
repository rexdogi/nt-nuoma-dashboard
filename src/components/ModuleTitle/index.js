import React from 'react';
import {withStyles} from 'material-ui/styles';
import {Typography} from "material-ui";

const styles = theme => ({
    headerTitle: {
        display: 'inline'
    },
});

const ModuleTitle = (props) => {
    const {children, classes} = props;

    return (
        <Typography className={classes.headerTitle} type='display1'>{children}</Typography>
    );
};


export default withStyles(styles)(ModuleTitle);