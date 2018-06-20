import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpandedPico from './ExpandedPico';
import CollapsedPico from './CollapsedPico';
import './PicoCard.css';

class Overview extends Component {
  render() {
    return (
      <div>
        Overview!
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

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
