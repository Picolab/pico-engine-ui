import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getName, getDID, getHost } from '../../reducers';

import { Manager, Target, Popper } from 'react-popper';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

class PicoCardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleClose(event) {
    if (this.menuTarget.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <Manager>
          <CardHeader
            title={this.props.name}
            action={
              <Target>
                <div ref={node => { this.menuTarget = node; }}>
                  <IconButton onClick={this.handleToggle}>
                    <MoreVertIcon />
                  </IconButton>
                </div>
              </Target>
            }
            className="noBottomPadding"
          />
          <Popper
            placement="bottom-end"
            eventsEnabled={this.state.open}
            className={this.state.open ? "popperOpened" : "popperClosed"}
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow in={this.state.open} id="menu-list-grow" style={{ transformOrigin: '0 0 0' }}>
                <Paper>
                  <MenuList role="menu">
                    <MenuItem onClick={this.handleClose}>Create Child</MenuItem>
                    <MenuItem onClick={this.handleClose}>Delete</MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    );
  }
}

PicoCardHeader.propTypes = {
  picoID: PropTypes.string.isRequired,
  DID: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  name: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  return {
    DID: getDID(state, ownProps.picoID),
    host: getHost(state, ownProps.picoID),
    name: getName(state, ownProps.picoID)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PicoCardHeader);
