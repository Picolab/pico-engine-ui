import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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
            <Button size="small" color="primary" onClick={this.props.expand}>Expand</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

CollapsedPico.propTypes = {
  name: PropTypes.string.isRequired,
  expand: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CollapsedPico);
