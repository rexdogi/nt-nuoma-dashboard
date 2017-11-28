import React from 'react';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    root: {
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16
    }
});

const ModuleFooter = (props) => {
    const {children, classes} = props;

    return (
        <div className={classes.root}>
            {children}
        </div>
    );
};


export default withStyles(styles)(ModuleFooter);