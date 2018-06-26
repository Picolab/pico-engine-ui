import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import Tooltip from '@material-ui/core/Tooltip';

class ImportSubs extends Component {
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
    return (
      <Tooltip
        enterDelay={300}
        id="tooltip-controlled"
        leaveDelay={300}
        onClose={this.handleTooltipClose}
        onOpen={this.handleTooltipOpen}
        open={this.state.open}
        placement="bottom"
        title="Display Subscriptions"
      >
        <IconButton size="small">
          <PeopleOutline />
        </IconButton>
      </Tooltip>
    );
  }
}

ImportSubs.propTypes = {
  picoID: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportSubs);
