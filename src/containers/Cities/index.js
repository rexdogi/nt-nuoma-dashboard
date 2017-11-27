import React from 'react';
import {Button, Paper, Typography, withStyles, withTheme} from "material-ui";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {Right, Left, MyTable, Module, ModuleHeader} from 'components/index';

class Cities extends React.Component {

    render() {
        const {classes, match} = this.props;

        const columns = [
            {id: 'id', label: 'Id', numeric: true, disablePadding: true},
            {id: 'name', label: 'Name', numeric: false, disablePadding: false},
            {id: 'name', label: 'Name', numeric: false, disablePadding: false},
        ];

        const rows = [
            {id: 1, name: 'Xd'},
            {id: 2, name: 'lil'}
        ];

        return (
            <Module>
                <ModuleHeader>
                    <Left>
                        <Typography className={classes.headerTitle} type='display1'>Cities</Typography>
                    </Left>
                    <Right>
                        <Button color="primary" raised>Create</Button>
                    </Right>
                </ModuleHeader>
                <MyTable rowData={rows} columnData={columns}/>
            </Module>
        );
    }
}

const styles = theme => ({
    headerTitle: {
        display: 'inline'
    },
});

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default compose(
    withStyles(styles, {
        name: 'Cities'
    }),
    withTheme(),
    connect(mapStateToProps, mapDispatchToProps),
)(Cities)
