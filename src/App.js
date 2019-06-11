import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyD16NgPQvo6XvwTCwB_g0z8YYxCHVnBYlg",
      authDomain: "manager-a236c.firebaseapp.com",
      databaseURL: "https://manager-a236c.firebaseio.com",
      projectId: "manager-a236c",
      storageBucket: "manager-a236c.appspot.com",
      messagingSenderId: "653244657882",
      appId: "1:653244657882:web:95126c97c3b14d11"
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return ( 
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
