import React from 'react';
import {
    Module,
    ModuleContent,
    ModuleHeader
} from 'components';
import {withStyles} from "material-ui/styles/index";
import {
    Divider, FormControl, IconButton, Input, InputLabel, MenuItem, Paper, Select, Toolbar,
    Typography
} from "material-ui";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import {ArrowBack} from 'material-ui-icons'
import {goBack} from 'react-router-redux';

const styles = theme => ({
    root: {
        padding: 16,
    },
    formControl: {
        minWidth: 120,
    },
    items: {
        marginLeft: 56
    },
    flex: {
        flex: 1
    }
});

class ModuleToolbar extends React.Component {

    render() {
        const {classes, withBackNav = true, title = 'title', children, goBack} = this.props;
        return (
            <Paper>
                <Toolbar>
                    {withBackNav &&
                    <IconButton aria-label="Menu" onClick={() => goBack()}>
                        <ArrowBack/>
                    </IconButton>
                    }
                    <Typography type="title" color="inherit" className={classes.flex}>
                        {title}
                    </Typography>

                    <div className={classes.items}>
                        {children}
                    </div>
                </Toolbar>
            </Paper>
        )
    }
}

function mapStateToProps(state) {
    return {
        languages: state.language.languages
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({goBack}, dispatch)
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(ModuleToolbar);