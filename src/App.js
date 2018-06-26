import React, { Component } from 'react';
import { isLoggedIn, setEntryDID, setEntryHost, getEntryDID, getEntryHost } from './config';
import LoggedInApp from './components/LoggedInApp/LoggedInApp.js';
import StartPage from './components/StartPage/StartPage.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

import promise from 'redux-promise';

//redux-saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

import { Map } from 'immutable';

const initialState = Map({
  //"version": "Not Yet Retrieved"
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
  }

  loginChange(newDid, newHost) {
    setEntryDID(newDid);
    setEntryHost(newHost);
    this.setState({
      loggedIn: isLoggedIn()
    });
  }

  renderPage() {
    if(this.state.loggedIn){
      return(
        <LoggedInApp entryDID={getEntryDID()} entryHost={getEntryHost()}/>
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
