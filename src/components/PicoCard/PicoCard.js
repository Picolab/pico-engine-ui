import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpandedPico from './ExpandedPico';
import CollapsedPico from './CollapsedPico';
import './PicoCard.css';

class PicoCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: props.expanded || true
    }
    this.toggleCard = this.toggleCard.bind(this);
  }

  toggleCard() {
    //send an event to save the state..
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {
    return (
      <div>
        {this.state.expanded ? <ExpandedPico name="Test Name" collapse={this.toggleCard}/>
                              : <CollapsedPico name="Test Name" expand={this.toggleCard}/>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PicoCard);
