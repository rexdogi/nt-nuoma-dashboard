import React from 'react';
import {Button, Divider, LinearProgress, Paper, Typography, withStyles, withTheme} from "material-ui";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {Right, Left, ModuleFooter, Module, ModuleHeader, ModuleContent, MyTextField, MyProgressBar} from 'components/index';
import {storeCity, reset, setField, editCity, updateCity} from "redux/modules/city/index";

class CitiesManage extends React.Component {

    componentDidMount() {
        const {match, reset, editCity} = this.props;
        reset();
        if(match.params.id) {
            editCity(match.params.id);
        }
    }


    handleChange = name => event => {
        this.props.setField(event.target.value, name);
    };

    handleSubmit = () => {
        const {city, match, storeCity, updateCity} = this.props;
        match.params.id
            ? updateCity(...city)
            : storeCity(...city);
    };

    render() {
        const {classes, match, errors, failed, success, loading, city} = this.props;
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
                            value={city.name}
                            margin="normal"
                            onChange={this.handleChange('name')}
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
        loading: state.city.manageLoading,
        success: state.city.manageSuccess,
        failed: state.city.manageFailed,
        city: state.city.city
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({storeCity, reset, setField, editCity, updateCity}, dispatch)
}

export default compose(
    withStyles(styles, {
        name: 'CitiesManage'
    }),
    withTheme(),
    connect(mapStateToProps, mapDispatchToProps),
)(CitiesManage)
