import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpandedPico from './ExpandedPico';
import CollapsedPico from './CollapsedPico';
import Draggable from 'react-draggable';
import { isCollapsed, getPosition, getName, getDID, getHost } from '../../reducers';

import { retrieveName, removePicoFromView, importChildren, importSubs, updateSettingsPosition } from '../../actions';

import './PicoCard.css';

class PicoCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapsed: props.collapsed || true
    }
    this.toggleCard = this.toggleCard.bind(this);
    this.onStop = this.onStop.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    if(!this.props.name) {
      //query for the name
      this.props.retrievePicoName(this.props.DID, this.props.picoID, this.props.host);
    }
  }

  toggleCard() {
    //send an event to save the state..
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  onStop(e, data) {
    let x = data.x;
    let y = data.y;
    this.props.updateSettingsPosition(this.props.picoID, x, y);
  }

  //NOTE: if the event is a double click, this function is called twice. There is no such thing as onSingleClick
  handleClick(e) {
    if(e.shiftKey){
      this.props.removeFromView(this.props.DID, this.props.picoID, this.props.host);
    }
  }

  handleDoubleClick(e) {
    this.props.retrieveChildren(this.props.DID, this.props.picoID, this.props.host);
    this.props.retrieveSubs(this.props.DID, this.props.picoID, this.props.host);
  }

  render() {
    let position = this.props.position.toJS();
    return (
      <Draggable
        onStop={this.onStop}
        bounds=".scrollableView"
        defaultPosition={position}>
        <div className="cardContainer" onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
          {!this.state.collapsed && <ExpandedPico picoID={this.props.picoID} collapse={this.toggleCard}/>}
          {this.state.collapsed && <CollapsedPico picoID={this.props.picoID} expand={this.toggleCard}/>}
        </div>
      </Draggable>
    );
  }
}

PicoCard.propTypes = {
  picoID: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  DID: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  removeFromView: PropTypes.func.isRequired,
  name: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  return {
    collapsed: isCollapsed(state, ownProps.picoID),
    position: getPosition(state, ownProps.picoID),
    DID: getDID(state, ownProps.picoID),
    host: getHost(state, ownProps.picoID),
    name: getName(state, ownProps.picoID)
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    retrievePicoName: (DID, picoID, host) => {
      dispatch(retrieveName(DID, picoID, host));
    },
    removeFromView: (DID, picoID, host) => {
      dispatch(removePicoFromView(DID, picoID, host));
    },
    updateSettingsPosition: (picoID, x, y) => {
      dispatch(updateSettingsPosition(picoID, x, y));
    },
    retrieveChildren: (DID, picoID, host) => {
      dispatch(importChildren(DID, picoID, host));
    },
    retrieveSubs: (DID, picoID, host) => {
      dispatch(importSubs(DID, picoID, host));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PicoCard);
