import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { importChildren } from '../../actions';
import { getDID, getHost } from '../../reducers';

import IconButton from '@material-ui/core/IconButton';
import People from '@material-ui/icons/People';
import Tooltip from '@material-ui/core/Tooltip';

class ImportChildren extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }

    this.handleTooltipOpen = this.handleTooltipOpen.bind(this);
    this.handleTooltipClose = this.handleTooltipClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleTooltipClose() {
    this.setState({
      open: false
    })
  }

  handleTooltipOpen() {
    this.setState({
      open: true
    })
  }

  handleClick() {
    this.props.retrieveChildren(this.props.DID, this.props.picoID, this.props.host);
  }

  render() {
    return (
      <Tooltip
        enterDelay={300}
        id="tooltip-controlled"
        leaveDelay={300}
        onClose={this.handleTooltipClose}
        onOpen={this.handleTooltipOpen}
        open={this.state.open}
        placement="bottom"
        title="Display Children"
      >
        <IconButton size="small" onClick={this.handleClick}>
          <People />
        </IconButton>
      </Tooltip>
    );
  }
}

ImportChildren.propTypes = {
  picoID: PropTypes.string.isRequired,
  DID: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    DID: getDID(state, ownProps.picoID),
    host: getHost(state, ownProps.picoID),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveChildren: (DID, picoID, host) => {
      dispatch(importChildren(DID, picoID, host));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportChildren);
