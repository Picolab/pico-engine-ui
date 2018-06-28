import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { importSubs } from '../../actions';
import { getDID, getHost } from '../../reducers';

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
    this.props.retrieveSubs(this.props.DID, this.props.picoID, this.props.host)
  }

  render() {
    const toolTipClass = this.state.open ? "" : "hidden";
    return (
      <Tooltip
        enterDelay={300}
        id={"importSubs" + this.props.picoId}
        onClose={this.handleTooltipClose}
        onOpen={this.handleTooltipOpen}
        open={this.state.open}
        placement="bottom"
        title="Display Subscriptions"
        classes={{tooltip: toolTipClass}}
      >
        <IconButton size="small" color="primary" onClick={this.handleClick}>
          <PeopleOutline />
        </IconButton>
      </Tooltip>
    );
  }
}

ImportSubs.propTypes = {
  picoID: PropTypes.string.isRequired,
  DID: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  retrieveSubs: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    DID: getDID(state, ownProps.picoID),
    host: getHost(state, ownProps.picoID),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveSubs: (DID, picoID, host) => {
      dispatch(importSubs(DID, picoID, host));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportSubs);
