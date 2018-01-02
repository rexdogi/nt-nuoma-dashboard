
import React from 'react';
import {Button, Divider, Paper, Typography, withStyles, withTheme} from "material-ui";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";
import {Right, Left, MyTable, Module, ModuleHeader, ModuleContent, MyProgressBar, ModuleTitle} from 'components/index';
import {push} from 'react-router-redux';
import {getProperties} from "redux/modules/property/index";

class Properties extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getProperties();
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    handleRowClick(row, index) {
        const {match, push} = this.props;
        push(`${match.url}/${row.id}`);
    }

    render() {
        const {classes, match, properties, failed, success, loading, push} = this.props;

        const columns = [
            {id: 'id', label: 'Id', numeric: true, disablePadding: true},
            {id: 'email', label: 'Email', numeric: false, disablePadding: false},
        ];

        return (
            <Module>
                <ModuleHeader>
                    <Left>
                        <ModuleTitle>Properties</ModuleTitle>
                    </Left>
                    <Right>
                        <Button
                            color="primary"
                            raised
                            onClick={() => push(`${match.url}/create`)}
                        >
                            Create
                        </Button>
                    </Right>
                </ModuleHeader>
                <Divider />
                <ModuleContent>
                    <MyTable
                        onRowClicked={this.handleRowClick}
                        rowData={properties}
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
        properties: state.property.properties,
        loading: state.property.indexLoading,
        success: state.property.indexSuccess,
        failed: state.property.indexFailed,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({push, getProperties}, dispatch)
}

export default compose(
    withStyles(styles, {
        name: 'Properties'
    }),
    withTheme(),
    connect(mapStateToProps, mapDispatchToProps),
)(Properties)
