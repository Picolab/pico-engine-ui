import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removePicoFromView } from '../../actions';
import { getDID, getHost } from '../../reducers';

import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

class RemoveFromView extends Component {
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
    this.props.removeFromView(this.props.DID, this.props.picoID, this.props.host);
  }

  render() {
    const toolTipClass = this.state.open ? "" : "hidden";
    return (
      <Tooltip
        enterDelay={300}
        id={"remove" + this.props.picoId}
        onClose={this.handleTooltipClose}
        onOpen={this.handleTooltipOpen}
        open={this.state.open}
        placement="bottom"
        title="Remove Pico From View"
        classes={{tooltip: toolTipClass}}
      >
        <IconButton size="small" color="secondary" onClick={this.handleClick}>
          <RemoveCircleOutline />
        </IconButton>
      </Tooltip>
    );
  }
}

RemoveFromView.propTypes = {
  picoID: PropTypes.string.isRequired,
  DID: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  removeFromView: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    DID: getDID(state, ownProps.picoID),
    host: getHost(state, ownProps.picoID),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromView: (DID, picoID, host) => {
      dispatch(removePicoFromView(DID, picoID, host));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveFromView);
