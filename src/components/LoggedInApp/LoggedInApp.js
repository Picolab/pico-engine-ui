import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import ClassicGrid from '../ClassicGrid/ClassicGrid';
import Header from '../Header/Header'
import './LoggedInApp.css';

class LoggedInApp extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <Sidebar />
          <ClassicGrid />
        </div>
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
