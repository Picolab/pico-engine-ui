import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PicoGrid from '../PicoGrid/PicoGrid';
import Header from '../Header/Header';
import { installUIRuleset } from '../../utils/picoSDK';
import { retrieveSettings } from '../../actions';
import SnackbarQueue from '../SnackbarQueue/SnackbarQueue';
import Sidebar from '../Sidebar/Sidebar.js';
import './LoggedInApp.css';

class LoggedInApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
       sidebarOpen : false
    };

    this.sidebarHandle=this.sidebarHandle.bind(this);
  }

  sidebarHandle() {
    this.setState({sidebarOpen : !this.state.sidebarOpen});
  }

  componentWillMount(){
    this.loadSettings();
  }

  loadSettings() {
    let installPromise = installUIRuleset(this.props.entryDID, this.props.entryHost);
    installPromise.then((resp) => {
      this.props.retrieveSettings();
    }).catch((error) => {
      console.error(error);
    })
  }

  render() {
    return (
      <div>
        <div className="appBar">
          <Header logoutButton={this.props.logoutButton} handle={this.sidebarHandle} />
        </div>
        <Sidebar handle={this.sidebarHandle} sidebarOpen={this.state.sidebarOpen} />
        <PicoGrid />
        <SnackbarQueue />
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
  return {
    retrieveSettings: () => {
      dispatch(retrieveSettings())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInApp);
