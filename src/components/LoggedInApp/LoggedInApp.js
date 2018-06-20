import React, { Component } from 'react';
import { connect } from 'react-redux';
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

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInApp);
