import React, { Component } from 'react';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';

class Channels extends Component {
  render() {
    return (
      <div>
        Channels!
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

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
