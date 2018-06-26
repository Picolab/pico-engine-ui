import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpandedPico from './ExpandedPico';
import CollapsedPico from './CollapsedPico';
import Draggable from 'react-draggable';
import { isCollapsed, getPosition, getName, getDID, getHost } from '../../reducers';
import { retrieveName } from '../../actions';
import './PicoCard.css';

class PicoCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      collapsed: props.collapsed || true
    }
    this.toggleCard = this.toggleCard.bind(this);
    this.onStop = this.onStop.bind(this);
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
    // console.log("event:", e);
    // console.log("data:", data);
  }

  render() {
    let position = this.props.position.toJS();
    return (
      <div>
        <Draggable
          onStop={this.onStop}
          bounds=".scrollableView"
          defaultPosition={position}>
          <div className="cardContainer">
            {!this.state.collapsed && <ExpandedPico picoID={this.props.picoID} collapse={this.toggleCard}/>}
            {this.state.collapsed && <CollapsedPico picoID={this.props.picoID} expand={this.toggleCard}/>}
          </div>
        </Draggable>
      </div>
    );
  }
}

PicoCard.propTypes = {
  picoID: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  DID: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PicoCard);
