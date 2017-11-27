import React from 'react';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    root: {
        padding: 16
    }
});

const ModuleHeader = (props) => {
    const {children, classes} = props;

    return (
        <div className={classes.root}>
            {children}
        </div>
    );
};


export default withStyles(styles)(ModuleHeader);