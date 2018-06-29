import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class CustomSnackbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleExited = this.handleExited.bind(this);
    this.handleActionClick = this.handleActionClick.bind(this);
  }

  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  handleExited() {
    this.props.handleExited();
  };

  handleActionClick() {
    this.handleClose();
    //we want to call the custom action function. Get the function, get the immutable List and turn it into a normal JS array, then pass
    //the parameters into the function using the spread operator
    const immutableParams = this.props.action.get("funcParams");
    const JSParams = immutableParams.toJS();
    this.props.action.get("func")(...JSParams);
  }

  render() {
    let snackbarAction = List([
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={this.handleClose}
      >
        <CloseIcon />
      </IconButton>
    ]);
    if(this.props.action) {
      snackbarAction = snackbarAction.unshift(
        <Button key="snackbarAction" color="secondary" size="small" onClick={this.handleActionClick}>
          {this.props.action.get("btnText")}
        </Button>
      )
    }
    return (
      <Snackbar
        key={this.props.sameKey}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={4000}
        onClose={this.handleClose}
        onExited={this.handleExited}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.props.message}</span>}
        action={snackbarAction}
      />
    );
  }
}

CustomSnackbar.propTypes = {
  handleExited: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  sameKey: PropTypes.string.isRequired,
  action: PropTypes.object
}

export default CustomSnackbar;
