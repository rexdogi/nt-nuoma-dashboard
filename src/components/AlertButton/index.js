import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

class AlertButton extends React.Component {

    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleAgree = () => {
        const {onClick} = this.props;
        onClick();
        this.setState({ open: false });
    };

    handleCancel = () => {
        this.setState({ open: false });
    };

    render() {
        const {onClick, children, ...rest} = this.props;
        return (
            <div>
                <Button onClick={this.handleClickOpen} {...rest} >{children}</Button>
                <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                    <DialogTitle>{"Are you sure you want to delete it?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You will not be able to revert this action.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancel} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleAgree} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AlertButton;