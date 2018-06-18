import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVersion } from '../../reducers';
import { bindActionCreators } from 'redux';
import { retrieveVersion } from '../../actions';

class Version extends Component {
  componentWillMount() {
    if(this.props.version === "Not Yet Retrieved"){
      this.props.retrieveVersion()
    }
  }

  render() {
    return (
      <h1 className="App-title">Version {this.props.version}</h1>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    version: getVersion(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    retrieveVersion
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Version);
