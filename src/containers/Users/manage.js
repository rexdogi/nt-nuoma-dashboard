import React from 'react';
import {Button, Divider, LinearProgress, Paper, Typography, withStyles, withTheme} from "material-ui";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {
    Right,
    Left,
    ModuleFooter,
    Module,
    ModuleHeader,
    ModuleContent,
    MyTextField,
    MyProgressBar,
    AlertButton,
    ModuleTitle
} from 'components/index';
import {storeUser, reset, setField, editUser, updateUser, destroyUser} from "redux/modules/user/index";

class UsersManage extends React.Component {

    componentDidMount() {
        const {match, reset, editUser} = this.props;
        reset();
        if(match.params.id) {
            editUser(match.params.id);
        }
    }


    handleChange = name => event => {
        this.props.setField(event.target.value, name);
    };

    handleSubmit = () => {
        const {user, match, storeUser, updateUser} = this.props;
        if(match.params.id) {
            updateUser(user)
        } else {
            storeUser(user)
        }
    };

    handleDestroy = () => {
        const {destroyUser, match} = this.props;
        destroyUser(match.params.id);
    };

    render() {
        const {classes, match, errors, failed, success, loading, user} = this.props;
        return (
            <Module>
                <ModuleHeader>
                    <Left>
                        <ModuleTitle>Users</ModuleTitle>
                    </Left>
                </ModuleHeader>
                <Divider />
                <ModuleContent>
                    <div className={classes.contentRoot}>
                        <MyTextField
                            fullWidth
                            errors={errors}
                            errorPrefix={true}
                            field="email"
                            label="Email"
                            value={user.email}
                            margin="normal"
                            onChange={this.handleChange('email')}
                        />
                    </div>
                </ModuleContent>
                <ModuleFooter>
                    <Button
                        disabled={loading}
                        color="primary"
                        raised
                        onClick={this.handleSubmit}
                    >
                        {match.params.id ? 'Update' : 'Create'}
                    </Button>
                    <Right>
                        {match.params.id &&
                        <AlertButton onClick={this.handleDestroy} disabled={loading} color="accent" raised>Delete</AlertButton>
                        }
                    </Right>
                </ModuleFooter>
                <MyProgressBar failed={failed} loading={loading} success={success}/>
            </Module>
        );
    }
}

const styles = theme => ({
    headerTitle: {
        display: 'inline'
    },
    contentRoot: {
        paddingLeft: 16,
        paddingBottom: 16
    }
});

function mapStateToProps(state) {
    return {
        errors: state.user.manageErrors,
        loading: state.user.manageLoading,
        success: state.user.manageSuccess,
        failed: state.user.manageFailed,
        user: state.user.user,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({storeUser, reset, setField, editUser, updateUser, destroyUser}, dispatch)
}

export default compose(
    withStyles(styles, {
        name: 'UsersManage'
    }),
    withTheme(),
    connect(mapStateToProps, mapDispatchToProps),
)(UsersManage)
