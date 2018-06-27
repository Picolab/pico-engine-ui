import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Overview from './Overview';
import Channels from './Channels';
import Logs from './Logs';
import PicoCardHeader from './PicoCardHeader';
import ImportSubs from './ImportSubs';
import ImportChildren from './ImportChildren';
import RemoveFromView from './RemoveFromView';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import UnfoldLess from '@material-ui/icons/UnfoldLess';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import './PicoCard.css';

const tabsEnum = Object.freeze({
  overview: 0,
  channels: 1,
  logs: 2
})

function TabContainer(props, dir) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
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
    const { theme } = this.props;
    return (
      <div>
        <Card className="picoCard">
          <PicoCardHeader picoID={this.props.picoID}/>
          <CardContent className="noTopPadding">
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
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.headerIndex}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabContainer><Overview/></TabContainer>
              <TabContainer><Channels/></TabContainer>
              <TabContainer><Logs/></TabContainer>
            </SwipeableViews>

          </CardContent>
          <CardActions>
            <IconButton size="small" color="primary" onClick={this.props.collapse}>
              <UnfoldLess />
            </IconButton>
            <ImportSubs picoID={this.props.picoID}/>
            <ImportChildren picoID={this.props.picoID}/>
            <RemoveFromView picoID={this.props.picoID}/>
          </CardActions>
        </Card>
      </div>
    );
  }
}

ExpandedPico.propTypes = {
  picoID: PropTypes.string.isRequired,
  collapse: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(null, { withTheme: true})(ExpandedPico));
