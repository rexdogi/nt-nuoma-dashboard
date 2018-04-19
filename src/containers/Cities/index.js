import React from 'react';
import {Button, withStyles, withTheme} from "material-ui";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {Module, ModuleContent, ModuleToolbar, MyProgressBar, MyTable, Right} from 'components/index';
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

    handleRowClick(row) {
        const {match} = this.props;
        this.props.push(`${match.url}/${row.id}`);
    }

    render() {
        const {classes, match, cities, failed, success, loading, cityKeys, translations} = this.props;

        const columns = [
            {id: 'id', label: 'Id', numeric: true, disablePadding: true},
            {id: 'title', label: 'Title', numeric: false, disablePadding: false},
        ];

        return (
            <div>
                <ModuleToolbar
                    title='Cities'
                    withBackNav={false}
                >
                    <Right>
                        <Button
                            color="primary"
                            raised
                            onClick={() => this.props.push(`${match.url}/create`)}
                        >
                            Create
                        </Button>
                    </Right>
                </ModuleToolbar>
            <div className={classes.modules}>
                <Module>
                    <ModuleContent>
                        <MyTable
                            onRowClicked={this.handleRowClick}
                            rowData={cities}
                            columnData={columns}
                        />
                    </ModuleContent>
                    <MyProgressBar failed={failed} loading={loading} success={success}/>
                </Module>
            </div>
            </div>
        );
    }
}

const styles = theme => ({
    headerTitle: {
        display: 'inline'
    },
    modules: {
        padding: 16
    },
    toolbar: {

    }
});

function mapStateToProps(state) {
    return {
        loading: state.city.indexLoading,
        success: state.city.indexSuccess,
        failed: state.city.indexFailed,
        cities: state.city.cities,
        cityKeys: state.city.result,
        translations: state.city.entities.translations
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({push, getCities}, dispatch);
}

export default compose(
    withStyles(styles, {
        name: 'Cities'
    }),
    withTheme(),
    connect(mapStateToProps, mapDispatchToProps),
)(Cities);
