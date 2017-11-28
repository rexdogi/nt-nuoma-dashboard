import React from 'react';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    root: {

    }
});

const ModuleContent = (props) => {
    const {children, classes} = props;

    return (
      <div className={classes.root}>
          {children}
      </div>
    );
};


export default withStyles(styles)(ModuleContent);