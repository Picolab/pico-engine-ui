import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import ClassicGrid from '../ClassicGrid/ClassicGrid';

class LoggedInApp extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <ClassicGrid />
      </div>
    );
  }
}

// <header className="App-header">
//   <img src={logo} className="App-logo" alt="logo" />
//   <Version />
// </header>

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInApp);
