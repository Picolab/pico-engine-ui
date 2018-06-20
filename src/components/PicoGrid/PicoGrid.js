import React, { Component } from 'react';
import { connect } from 'react-redux';
import PicoCard from '../PicoCard/PicoCard';

class PicoGrid extends Component {
  render() {
    return (
      <div>
        <PicoCard />
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

export default connect(mapStateToProps, mapDispatchToProps)(PicoGrid);
