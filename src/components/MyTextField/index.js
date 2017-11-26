import * as React from 'react';
import {TextField, withStyles} from 'material-ui';
import {compose} from "redux";

const MyTextField = (props) => {
    const {errorPrefix = false, field, errors, ...rest} = props;
    let errorMessage = '';
    let error;
    let label = errorPrefix ? field + ' ' : '';
    if(errors !== undefined) {
        error = errors.find(error => error.field === field);
        errorMessage = error !== undefined ? label + error.defaultMessage : '';
    }
    return (
        <TextField {...rest} error={error !== undefined} helperText={errorMessage}/>
    )
};

const styles = theme => ({});

export default compose(
    withStyles(styles, {name: 'MyTextField'}),
)(MyTextField)