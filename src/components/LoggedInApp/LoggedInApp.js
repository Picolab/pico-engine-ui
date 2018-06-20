import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PicoGrid from '../PicoGrid/PicoGrid';
import Header from '../Header/Header'
import './LoggedInApp.css';

class LoggedInApp extends Component {
  render() {
    return (
      <div>
        <Header />
        <PicoGrid />
      </div>
    );
  }
}

LoggedInApp.propTypes = {
  entryDID: PropTypes.string.isRequired,
  entryHost: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInApp);
