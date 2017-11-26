import React from 'react';
import {withStyles} from "material-ui";
import {compose} from "redux";
import red from "material-ui/es/colors/red";

const InputError = (props) => {

    const {error} = props;

    return (
        <span>
            {error !== undefined &&
            <span>{error.field + ' ' + error.defaultMessage}</span>
            }
        </span>
    )
};

const styles = theme => ({
    error: {
        color: red[500]
    }
});

export default compose(
    withStyles(styles, {
        name: 'InputError'
    }),
)(InputError)