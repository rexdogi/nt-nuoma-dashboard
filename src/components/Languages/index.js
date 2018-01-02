import React from 'react';
import {
    Module,
    ModuleContent,
    ModuleHeader
} from 'components';
import {withStyles} from "material-ui/styles/index";
import {Divider, FormControl, Input, InputLabel, MenuItem, Paper, Select, Typography} from "material-ui";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";

const styles = theme => ({
    root: {
        marginBottom: 20,
    },
    formControl: {
        minWidth: 120,
        marginBottom: 16
    },
});


class Languages extends React.Component {

    render() {
        const {classes, handleChange, languages, children, style} = this.props;

        const languageList = languages.map((item) => {
            return (
                <MenuItem value={10}>{item.title}</MenuItem>
            )
        });
        return (
            <Module style={style}>
                <ModuleHeader>
                    <Typography type="display1" gutterBottom>
                        Translation Language
                    </Typography>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="language">Language</InputLabel>
                        <Select
                            value={null}
                            onChange={handleChange}
                            input={<Input name="language" id="language"/>}
                        >
                            {languageList}
                        </Select>
                    </FormControl>
                </ModuleHeader>
                <Divider/>
                <ModuleContent>
                    {children}
                </ModuleContent>
            </Module>
        )
    }
}

function mapStateToProps(state) {
    return {
        languages: state.language.languages
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(Languages);