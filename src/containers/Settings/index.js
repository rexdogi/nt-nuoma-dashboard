import React from 'react';
import { Paper, withStyles, withTheme, withWidth} from "material-ui";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";


class Settings extends React.Component {

    render() {
        const {classes, errors} = this.props;

        return (
            <Paper className={classes.root}>adsad</Paper>
        );
    }
}

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
});

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default compose(
    withStyles(styles, {
        name: 'Settings'
    }),
    withTheme(),
    connect(mapStateToProps, mapDispatchToProps),
)(Settings)
