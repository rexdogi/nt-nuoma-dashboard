import React from 'react';
import {AuthForm} from 'components';
import {Button, TextField, withStyles, withTheme, withWidth} from "material-ui";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {login} from "redux/modules/auth/index";
import {push} from 'react-router-redux';

class Login extends React.Component {

    state = {
        email: '',
        password: ''
    };

    handleLogin = () => {
        this.props.login(this.state.email, this.state.password);
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    render() {
        const {classes} = this.props;

        return (
            <AuthForm>
                <form>
                    <TextField
                        field="email"
                        fullWidth
                        label="Email"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        className={classes.textField}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        label="Password"
                        type="password"
                        className={classes.textField}
                        margin="normal"
                    />

                    <Button
                        onClick={this.handleLogin}
                        raised
                        color="primary"
                        className={classes.button}>
                        Login
                    </Button>

                    <Button
                        style={{marginTop: 20}}
                        onClick={() => this.props.push('/register')}
                        raised
                        color="primary"
                        className={classes.button}>
                        Or Sign up
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
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({login, push}, dispatch)
}

export default compose(
    withStyles(styles, {
        name: 'Login'
    }),
    withWidth(),
    withTheme(),
    connect(mapStateToProps, mapDispatchToProps),
)(Login)
