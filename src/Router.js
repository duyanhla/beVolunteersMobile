import React from 'react';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Drawer from './components/Drawer';
import Comment from './components/post/Comment';
import PostSection from './components/post/PostSection';
import HomePage from './components/HomePage';


const RouterComponent = () => {
  return (
    <Router backAndroidHandler={() => (false)}>
      <Scene key="root" hideNavBar >
        <Scene key="auth"  >
          <Scene key="login" component={LoginForm} hideNavBar/>
          </Scene>
        <Scene key="main" hideNavBar back drawerLockMode='locked-closed' >
        <Scene  key="drawer" component={Drawer} title="h" hideNavBar  
         />
         <Scene key="home" component ={HomePage} hideNavBar initial />
        </Scene> 

      </Scene>
    </Router>
  );
};



export default RouterComponent;