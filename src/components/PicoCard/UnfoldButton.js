import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { importChildren } from '../../actions';
import { getDID, getHost } from '../../reducers';

import IconButton from '@material-ui/core/IconButton';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import UnfoldLess from '@material-ui/icons/UnfoldLess';
import Tooltip from '@material-ui/core/Tooltip';

class UnfoldButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }

    this.handleTooltipOpen = this.handleTooltipOpen.bind(this);
    this.handleTooltipClose = this.handleTooltipClose.bind(this);
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

  render() {
    const toolTipClass = this.state.open ? "" : "hidden";
    return (
      <Tooltip
        enterDelay={300}
        id={"unfoldToolTip"}
        onClose={this.handleTooltipClose}
        onOpen={this.handleTooltipOpen}
        open={this.state.open}
        placement="bottom"
        title={this.props.type}
        classes={{tooltip: toolTipClass}}
      >
        <IconButton size="small" color="primary" onClick={this.props.onClick}>
          {this.props.type === "Expand" && <UnfoldMore />}
          {this.props.type === "Collapse" && <UnfoldLess />}
        </IconButton>
      </Tooltip>
    );
  }
}

UnfoldButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
}

export default UnfoldButton;
