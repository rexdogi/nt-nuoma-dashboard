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

class MyProgressBar extends React.Component {

  /*  state = {
        delay: false
    };

    componentWillReceiveProps(props) {
        const {loading, failed} = props;
        this.setState({delay: true});

        if(!loading || failed) {
            setTimeout(() => {
                this.setState({delay: false})
            }, 300)
        } else {
            this.setState({delay: false})
        }
    }*/

    render() {
        const {classes, loading = false, success = false, failed = false} = this.props;

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
    }

};

export default withStyles(styles)(MyProgressBar);