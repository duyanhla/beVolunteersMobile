import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { 
  createDrawerNavigator, 
  createAppContainer,
  NavigationActions,
  DrawerActions
} from 'react-navigation';
import { Container } from 'native-base';
import DrawerContent from './DrawerContent';
import HomeScreen from './HomePage';
import PostSection from './post/PostSection';
import LoginForm from './LoginForm';
import EventSection from './event/EventSection';
import Userscreen from './profile/Userscreen';
import CheckAttendance from './attendance/CheckAttendance';
import NewPost from './post/NewPost';

const DrawerNav = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Login: {
      screen: LoginForm,
    },
    Profile: {
      screen: Userscreen,
    },
    Post: {
      screen: PostSection
    },
    Event: {
      screen: EventSection
    },
    Attendance: {
      screen: CheckAttendance
    },
    NewPost: {
      screen: NewPost
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
    backBehavior: 'none',
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

