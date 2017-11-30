import React from 'react';
import {withStyles} from 'material-ui/styles';
import {LinearProgress} from "material-ui";
import green from "material-ui/es/colors/green";
import red from "material-ui/es/colors/red";

const styles = theme => ({
    root: {

    },

    successBar: {
        backgroundColor: green[500],
        height: 5
    },

    errorBar: {
        backgroundColor: red[500],
        height: 5
    }
});

const MyProgressBar = (props) => {
    const {classes, loading = false, success = false, failed = false} = props;

    return (
        <div className={classes.root}>
            {loading &&
            <LinearProgress/>
            }

            {!loading && success &&
            <div className={classes.successBar}/>
            }

            {!loading && !success && failed &&
            <div className={classes.errorBar}/>
            }
        </div>
    );
};

export default withStyles(styles)(MyProgressBar);