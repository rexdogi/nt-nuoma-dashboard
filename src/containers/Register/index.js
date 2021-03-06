import React from 'react';
import {Button, FormHelperText, TextField, withStyles, withTheme, withWidth} from "material-ui";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {register} from "redux/modules/auth/index";
import {MyTextField} from 'components';
import {AuthForm} from 'components';
import {push} from 'react-router-redux';


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
            <AuthForm>
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

                    <Button
                        style={{marginTop: 20}}
                        onClick={() => this.props.push('/login')}
                        raised
                        color="primary"
                        className={classes.button}>
                        Or Login
                    </Button>

                </form>
            </AuthForm>
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
        errors: state.auth.registerErrors
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({register, push}, dispatch)
}

export default compose(
    withStyles(styles, {
        name: 'Register'
    }),
    withWidth(),
    withTheme(),
    connect(mapStateToProps, mapDispatchToProps),
)(Register)
