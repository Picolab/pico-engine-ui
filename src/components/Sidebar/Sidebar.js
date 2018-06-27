import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import './Sidebar.css';


class Sidebar extends Component {

  render() {
    const open = this.props.sidebarOpen;
    return (
      <Drawer
        classes={{
          paper: 'classes-sidebar'
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Divider />
        <List>
          <ListItem>
            <Typography className="expanded">Subscription Lines</Typography>
            <Switch />
          </ListItem>
          <ListItem>
            <Typography className="expanded">Child Lines</Typography>
            <Switch />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    );
  }
}

export default Sidebar;
