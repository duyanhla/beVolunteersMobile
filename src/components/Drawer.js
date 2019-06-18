import React, { Component } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { 
  createDrawerNavigator, 
  createAppContainer,
  NavigationActions,
  DrawerActions
} from 'react-navigation';
import { Container } from 'native-base';

import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import DrawerContent from './DrawerContent';
import HomeScreen from './HomePage';
import PostSection from './post/PostSection';


const DrawerNav = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Hello: {
      screen: EmployeeForm,
    },
    Login: {
      screen: EmployeeList,
    },
    Post: {
      screen: PostSection
    }
  },

  {
    contentComponent: DrawerContent,
    initialRouteName: 'Home',
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentOptions: {
    activeTintColor: '#e91e63',
    },
  }
  );

const MyDrawer = createAppContainer(DrawerNav);

class Drawer extends React.Component{
  
  constructor(props) {
    super(props);
  }
  render(){
    return(
      
      <Container>
        
        <MyDrawer >
        </MyDrawer >
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  }
})

export default Drawer;

