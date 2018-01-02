
import React from 'react';
import {Button, Divider, Paper, Typography, withStyles, withTheme} from "material-ui";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {Right, Left, MyTable, Module, ModuleHeader, ModuleContent, MyProgressBar, ModuleTitle} from 'components/index';
import {push} from 'react-router-redux';
import {getUsers} from "redux/modules/user/index";

class Users extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUsers();
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    handleRowClick(row, index) {
        const {match} = this.props;
        this.props.push(`${match.url}/${row.id}`);
    }

    render() {
        const {classes, match, users, failed, success, loading} = this.props;

        const columns = [
            {id: 'id', label: 'Id', numeric: true, disablePadding: true},
            {id: 'email', label: 'Email', numeric: false, disablePadding: false},
        ];

        return (
            <Module>
                <ModuleHeader>
                    <Left>
                        <ModuleTitle>Users</ModuleTitle>
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
                    <MyTable
                        onRowClicked={this.handleRowClick}
                        rowData={users}
                        columnData={columns}
                    />
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
        users: state.user.users,
        loading: state.user.indexLoading,
        success: state.user.indexSuccess,
        failed: state.user.indexFailed,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({push, getUsers}, dispatch)
}

export default compose(
    withStyles(styles, {
        name: 'Users'
    }),
    withTheme(),
    connect(mapStateToProps, mapDispatchToProps),
)(Users)
