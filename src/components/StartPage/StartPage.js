import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../../images/logo.png';
import './StartPage.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      did: "",
      host: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name) {
    return (event) => {
      this.setState({
        [name]: event.target.value
      })
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.loginChange(this.state.did, this.state.host);
  }

  render() {
    return (
      <div className="loginPage">
        <Card className="loginCard">
          <CardMedia
            className="loginPic"
            image={logo}
            title="PicoLabs UI"
          />
          <CardContent>
            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <TextField
                className="loginInput"
                id="DID"
                label="DID"
                value={this.state.did}
                onChange={this.handleChange('did')}
                margin="normal"
                />
              <TextField
                id="host"
                label="Host"
                value={this.state.host}
                onChange={this.handleChange('host')}
                margin="normal"
                />
              <br/>
              <Button className="loginSubmit" size="small" color="primary" type="submit">
                Access Pico
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

StartPage.propTypes = {
  loginChange: PropTypes.func.isRequired
}

export default StartPage;
