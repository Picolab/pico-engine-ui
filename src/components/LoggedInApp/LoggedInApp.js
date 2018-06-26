import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PicoGrid from '../PicoGrid/PicoGrid';
import Header from '../Header/Header';
import { installUIRuleset } from '../../utils/picoSDK';
import { retrieveSettings } from '../../actions';
import './LoggedInApp.css';

class LoggedInApp extends Component {
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
  return {
    retrieveSettings: () => {
      dispatch(retrieveSettings())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInApp);
