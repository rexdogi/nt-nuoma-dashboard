import React from 'react';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    root: {
        float: 'left'
    }
});

const Left = (props) => {
    const {children, classes} = props;

    return (
        <span className={classes.root}>
            {children}
        </span>
    );
};


export default withStyles(styles)(Left);