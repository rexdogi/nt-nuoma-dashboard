import React from 'react';
import {Button, Divider, Paper, Typography, withStyles, withTheme} from "material-ui";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {Right, Left, MyTable, Module, ModuleHeader, ModuleContent, MyProgressBar} from 'components/index';
import {push} from 'react-router-redux';
import {getCities} from "redux/modules/city/index";

class Cities extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getCities();
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    handleRowClick(row, index) {
        const {match} = this.props;
        this.props.push(`${match.url}/${row.id}`);
    }

    onChange = event => value => {

    };

    render() {
        const {classes, match, cities, failed, success, loading} = this.props;

        const columns = [
            {id: 'id', label: 'Id', numeric: true, disablePadding: true},
            {id: 'name', label: 'Name', numeric: false, disablePadding: false},
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
                    <MyTable
                        onRowClicked={this.handleRowClick}
                        rowData={cities}
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
        loading: state.city.indexLoading,
        success: state.city.indexSuccess,
        failed: state.city.indexFailed,
        cities: state.city.cities
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
