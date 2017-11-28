import React from 'react';
import {Button, Divider, Paper, Typography, withStyles, withTheme} from "material-ui";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {Right, Left, MyTable, Module, ModuleHeader, ModuleContent, MyProgressBar} from 'components/index';
import {push} from 'react-router-redux';
import {getCities} from "redux/modules/city";

class Cities extends React.Component {

    componentDidMount() {
        this.props.getCities();
    }

    render() {
        const {classes, match, failed, success, loading} = this.props;

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
                        <Button
                            color="primary"
                            raised
                            onClick={() => this.props.push(`${match.url}/create`)}
                        >
                            Create
                        </Button>
                    </Right>
                </ModuleHeader>
                <Divider />
                <ModuleContent>
                    <MyTable rowData={rows} columnData={columns}/>
                </ModuleContent>
                <MyProgressBar failed={failed} loading={loading} success={success}/>
            </Module>
        );
    }
}

const styles = theme => ({
    headerTitle: {
        display: 'inline'
    },
});

function mapStateToProps(state) {
    return {
        loading: state.city.loading,
        completed: state.city.success,
        failed: state.city.failed,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({push, getCities}, dispatch)
}

export default compose(
    withStyles(styles, {
        name: 'Cities'
    }),
    withTheme(),
    connect(mapStateToProps, mapDispatchToProps),
)(Cities)
