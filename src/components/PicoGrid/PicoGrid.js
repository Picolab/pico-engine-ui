import React, { Component } from 'react';
import { connect } from 'react-redux';
import PicoCard from '../PicoCard/PicoCard';
import { getPicoIDList } from '../../reducers';
import './PicoGrid.css';

class PicoGrid extends Component {

  displayPicos() {
    let toDisplay = [];
    this.props.picoList.forEach(picoID => {
      toDisplay.push(
        <div key={picoID}>
          <PicoCard picoID={picoID}/>
        </div>)
    });
    return toDisplay;
  }

  render() {
    return (
      <div className="gridContainer">
        <div className="scrollableView">
          {this.displayPicos()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    picoList: getPicoIDList(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PicoGrid);
