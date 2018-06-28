import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getName } from '../../reducers';
import ImportSubs from './ImportSubs';
import ImportChildren from './ImportChildren';
import RemoveFromView from './RemoveFromView';
import UnfoldButton from './UnfoldButton';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './PicoCard.css';

class CollapsedPico extends Component {
  render() {
    return (
      <div>
        <Card className="picoCard">
          <CardContent>
            <Typography variant="headline" component="h3">
              {this.props.name}
            </Typography>
          </CardContent>
          <CardActions>
            <UnfoldButton onClick={this.props.expand} type="Expand"/>
            <ImportSubs picoID={this.props.picoID}/>
            <ImportChildren picoID={this.props.picoID}/>
            <RemoveFromView picoID={this.props.picoID}/>
          </CardActions>
        </Card>
      </div>
    );
  }
}

CollapsedPico.propTypes = {
  picoID: PropTypes.string.isRequired,
  expand: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    name: getName(state, ownProps.picoID) || "Loading..."
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CollapsedPico);
