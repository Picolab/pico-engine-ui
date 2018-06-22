import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpandedPico from './ExpandedPico';
import CollapsedPico from './CollapsedPico';
import Draggable from 'react-draggable';
import './PicoCard.css';

class PicoCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: props.expanded || true
    }
    this.toggleCard = this.toggleCard.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  toggleCard() {
    //send an event to save the state..
    this.setState({
      expanded: !this.state.expanded
    })
  }

  onStop(e, data) {
    console.log("event:", e);
    console.log("data:", data);
  }

  render() {
    return (
      <div>
        <Draggable
          onStop={this.onStop}
          bounds=".scrollableView">
          <div className="cardContainer">
            {this.state.expanded ? <ExpandedPico name="Test Name" collapse={this.toggleCard}/>
                                  : <CollapsedPico name="Test Name" expand={this.toggleCard}/>}
          </div>
        </Draggable>
      </div>
    );
  }
}

PicoCard.propTypes = {
  picoID: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PicoCard);
