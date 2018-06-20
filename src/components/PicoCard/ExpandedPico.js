import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Overview from './Overview';
import Channels from './Channels';
import Logs from './Logs';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import './PicoCard.css';

const tabsEnum = Object.freeze({
  overview: 0,
  channels: 1,
  logs: 2
})

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class ExpandedPico extends Component {
  constructor(props){
    super(props);
    this.state = {
      headerIndex: props.headerIndex | tabsEnum.overview
    }
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(event, value) {
    this.setState({
      headerIndex: value
    })
  }

  render() {
    const { headerIndex } = this.state;
    return (
      <div>
        <Card className="picoCard">
          <CardContent>
            <Tabs
              value={this.state.headerIndex}
              onChange={this.handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              <Tab label="Overview" />
              <Tab label="Channels" />
              <Tab label="Logs" />
            </Tabs>
            {headerIndex === tabsEnum.overview && <TabContainer><Overview/></TabContainer>}
            {headerIndex === tabsEnum.channels && <TabContainer><Channels/></TabContainer>}
            {headerIndex === tabsEnum.logs && <TabContainer><Logs/></TabContainer>}
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={this.props.collapse}>Collapse</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

ExpandedPico.propTypes = {
  name: PropTypes.string.isRequired,
  collapse: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpandedPico);
