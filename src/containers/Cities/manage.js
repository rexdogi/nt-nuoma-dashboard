import React from 'react';
import {Button, Divider, LinearProgress, Paper, Typography, withStyles, withTheme} from "material-ui";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {Right, Left, ModuleFooter, Module, ModuleHeader, ModuleContent, MyTextField, MyProgressBar} from 'components/index';
import {storeCity, reset} from "redux/modules/city";

class CitiesManage extends React.Component {

    componentDidMount() {
        this.props.reset();
    }

    state = {
        city: ''
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value})
    };

    handleCreate = () => {
        this.props.storeCity(this.state.city)
    };

    render() {
        const {classes, match, errors, failed, success, loading} = this.props;
        return (
            <Module>
                <ModuleHeader>
                    <Left>
                        <Typography className={classes.headerTitle} type='display1'>Cities</Typography>
                    </Left>
                </ModuleHeader>
                <Divider />
                <ModuleContent>
                    <div className={classes.contentRoot}>
                        <MyTextField
                            fullWidth
                            errors={errors}
                            errorPrefix={true}
                            field="city"
                            label="City"
                            value={this.state.city}
                            margin="normal"
                            onChange={this.handleChange('city')}
                        />
                    </div>
                </ModuleContent>
                <ModuleFooter>
                    <Button
                        disabled={loading}
                        color="primary"
                        raised
                        onClick={this.handleCreate}
                    >
                        Create
                    </Button>
                    <Right>
                        {match.params.id &&
                        <Button disabled={loading} color="accent" raised>Delete</Button>
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
        errors: state.city.errors,
        loading: state.city.loading,
        success: state.city.success,
        failed: state.city.failed,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({storeCity, reset}, dispatch)
}

export default compose(
    withStyles(styles, {
        name: 'CitiesManage'
    }),
    withTheme(),
    connect(mapStateToProps, mapDispatchToProps),
)(CitiesManage)
