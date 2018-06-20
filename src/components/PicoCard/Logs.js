import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpandedPico from './ExpandedPico';
import CollapsedPico from './CollapsedPico';
import './PicoCard.css';

class Logs extends Component {
  render() {
    return (
      <div>
        Logs!
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

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
