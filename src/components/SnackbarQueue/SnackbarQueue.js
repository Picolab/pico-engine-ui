import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSnackbarQueue } from '../../reducers';
import { shiftSnackbarQueue } from '../../actions';

import CustomSnackbar from './CustomSnackbar';

class SnackbarQueue extends Component {
  constructor(props) {
    super(props);
    this.handleExited = this.handleExited.bind(this);
  }

  handleExited() {
    this.props.shiftSnackbarQueue();
  };

  render() {
    const { snackbarQueue } = this.props;
    if(snackbarQueue.count() === 0) {
      return (<div></div>);
    }
    const currentMessage = snackbarQueue.first();
    //if the key prop in snackbar changes, then this snackbar will rerender.
    //See https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
    return (
      <CustomSnackbar
        key={currentMessage.get("key")}
        sameKey={currentMessage.get("key")}
        message={currentMessage.get("message")}
        handleExited={this.handleExited}
        action={currentMessage.get("action")}
      />
    );
  }
}

SnackbarQueue.propTypes = {
  snackbarQueue: PropTypes.object.isRequired //immutable js lists are objects
}

const mapStateToProps = (state, ownProps) => {
  return {
    snackbarQueue: getSnackbarQueue(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    shiftSnackbarQueue: () => {
      dispatch(shiftSnackbarQueue())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarQueue);
