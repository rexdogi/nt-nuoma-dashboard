import React from 'react';
import {withStyles} from 'material-ui/styles';
import {Paper} from "material-ui";
import classNames from 'classnames';

const styles = theme => ({
    root: {
    }
});

const Module = (props) => {
    const {children, classes, style} = props;

    return (
        <Paper style={style} className={classNames(classes.root)}>
            {children}
        </Paper>
    );
};


export default withStyles(styles)(Module);