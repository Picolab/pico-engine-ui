import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import ClassicGrid from '../ClassicGrid/ClassicGrid';
import './MainBody.css';

class MainBody extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <ClassicGrid />
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

export default connect(mapStateToProps, mapDispatchToProps)(MainBody);
