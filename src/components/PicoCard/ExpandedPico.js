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
import UnfoldButton from './UnfoldButton';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import { updateSettingsTab } from '../../actions';
import { withStyles } from '@material-ui/core/styles';
import { getTab } from '../../reducers';
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

  componentDidMount() {
    this.setState({
      headerIndex: this.state.headerIndex
    });
  }

  handleTabChange(event, value) {
    this.props.updateSettingsTab(this.props.picoID, value);
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
            <UnfoldButton onClick={this.props.collapse} type="Collapse"/>
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
  collapse: PropTypes.func.isRequired,
  headerIndex: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    headerIndex: getTab(state, ownProps.picoID)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSettingsTab: (picoID, tab) => {
      dispatch(updateSettingsTab(picoID, tab));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(null, { withTheme: true})(ExpandedPico));
