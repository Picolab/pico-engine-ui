import React, { Component } from 'react';
import { isLoggedIn, setEntryDID, setEntryHost, getEntryDID, getEntryHost, logout } from './config';
import LoggedInApp from './components/LoggedInApp/LoggedInApp.js';
import StartPage from './components/StartPage/StartPage.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { fromJS } from 'immutable';
import './App.css';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

import promise from 'redux-promise';

//redux-saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

import { Map } from 'immutable';
import uuidv4 from 'uuid/v4';

const initialState = Map({
  snackbarQueue: fromJS([{
    message: "Welcome to Pico DevTools!",
    key: uuidv4()
  }])
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(promise, sagaMiddleware))
)

sagaMiddleware.run(rootSaga);

const theme = createMuiTheme();

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedIn: isLoggedIn()
    }

    this.loginChange = this.loginChange.bind(this);
    this.logoutHandle = this.logoutHandle.bind(this);
  }

  loginChange(newDid, newHost) {
    setEntryDID(newDid);
    setEntryHost(newHost);
    this.setState({
      loggedIn: isLoggedIn()
    });
  }

  logoutHandle(){
    logout();
    this.setState({
      loggedIn: isLoggedIn()
    });
  }

  renderPage() {
    if(this.state.loggedIn){
      return(
        <LoggedInApp entryDID={getEntryDID()} entryHost={getEntryHost()} logoutButton={this.logoutHandle} />
      )
    }
    return(
      <StartPage loginChange={this.loginChange}/>
    )
  }

  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            {this.renderPage()}
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
