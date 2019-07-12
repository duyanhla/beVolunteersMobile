import React from 'react';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Drawer from './components/Drawer';
import Comment from './components/post/Comment';
import PostSection from './components/post/PostSection';
import HomePage from './components/HomePage';
import Userscreen from './components/profile/Userscreen';

const RouterComponent = () => {
  return (
    <Router backAndroidHandler={() => {}}>
      <Scene key="root" hideNavBar >
        <Scene key="auth"  >
          <Scene key="login" component={LoginForm} hideNavBar/>
          </Scene>
        <Scene key="main" hideNavBar back drawerLockMode='locked-closed' >
        <Scene  key="drawer" component={Drawer} hideNavBar  />
        </Scene> 

      </Scene>
    </Router>
  );
};



export default RouterComponent;