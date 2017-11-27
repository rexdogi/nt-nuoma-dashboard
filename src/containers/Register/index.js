import React from 'react';
import MiniAuthWrapper from 'components/AuthForm/index';
import {Button, FormHelperText, TextField, withStyles, withTheme, withWidth} from "material-ui";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {register} from "redux/modules/auth";
import MyTextField from 'components/MyTextField/index';

class Register extends React.Component {

    state = {
        email: '',
        password: '',
        passwordConfirm: ''
    };

    handleRegister = () => {
        this.props.register(this.state.email, this.state.password);
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    render() {
        const {classes, errors} = this.props;

        return (
            <MiniAuthWrapper>
                <form>
                    <MyTextField
                        errors={errors}
                        errorPrefix={true}
                        field="email"
                        fullWidth
                        label="Email"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        className={classes.textField}
                        margin="normal"
                    />

                    <MyTextField
                        errorPrefix={true}
                        errors={errors}
                        field="password"
                        fullWidth
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        label="Password"
                        type="password"
                        className={classes.textField}
                        margin="normal"
                    />

                    <MyTextField
                        fullWidth
                        value={this.state.passwordConfirm}
                        onChange={this.handleChange('passwordConfirm')}
                        label="Confirm Password"
                        type="password"
                        className={classes.textField}
                        margin="normal"
                    />
                    {this.state.password !== this.state.passwordConfirm &&
                    <FormHelperText error>Invalid confirmation</FormHelperText>
                    }

                    <Button
                        disabled={this.state.password !== this.state.passwordConfirm}
                        onClick={this.handleRegister}
                        raised
                        color="primary"
                        className={classes.button}>
                        Sign Up
                    </Button>

                </form>
            </MiniAuthWrapper>
        );
    }
}

const styles = theme => ({
    textField: {},

    container: {
        padding: theme.spacing.unit
    },

    button: {
        position: 'relative',
        width: '100%',
        bottom: '0',
    },
});

function mapStateToProps(state) {
    return {
        errors: state.auth.errors
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({register}, dispatch)
}

export default compose(
    withStyles(styles, {
        name: 'Register'
    }),
    withWidth(),
    withTheme(),
    connect(mapStateToProps, mapDispatchToProps),
)(Register)
