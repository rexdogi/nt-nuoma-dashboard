import React from 'react';
import {FormControl, Input, MenuItem, Select, withStyles, withTheme} from "material-ui";
import {destroyCity, editCity, reset, setField, storeCity, updateCity} from "../../redux/modules/city";
import {connect} from "react-redux";
import {bindActionCreators, compose} from "redux";

class LanguageSelect extends React.Component {

    render() {
        const {classes, languages, value = 1, onChange} = this.props;

        const items = languages.map(lang => (
           <MenuItem key={lang.id} value={lang.id}>{lang.title}</MenuItem>
        ));

        return (
            <FormControl className={classes.formControl}>
                <Select
                    value={value}
                    input={<Input name="language" id="language"/>}
                    onChange={onChange}
                >
                    {items}
                </Select>
            </FormControl>
        )
    }
}

const styles = theme => ({
    formControl: {
        minWidth: 120,
    },
});

function mapStateToProps(state) {
    return {
        languages: state.language.languages
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({storeCity, reset, setField, editCity, updateCity, destroyCity}, dispatch)
}

export default compose(
    withStyles(styles, {
        name: 'LanguageSelect'
    }),
    withTheme(),
    connect(mapStateToProps, mapDispatchToProps),
)(LanguageSelect)

