import _ from 'lodash';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { View, StyleSheet, Image } from 'react-native'
import { Button,Container,Header,Left,Right,Icon,Text, Body } from 'native-base';
import { connect } from "react-redux";
import * as userActions from "../actions/UserAction";
var permissionArr = { USER: "Cá nhân", ORG: "Tổ chức" };


class drawerContentComponents extends Component {

  constructor(props){
    super(props);
  }
  handleImageChange = e => {
    e.persist();
    const file = e.target.files[0];
    this.setState({ avatar: file });
    this.props.uploadAvatar(file);
  };

  navigateToScreen = ( route ) =>(
      () => {
      const navigateAction = NavigationActions.navigate({
          routeName: route
      });
      this.props.navigation.dispatch(navigateAction);
  })

  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../../assets/images/banner1.png')}
            style={{ flex: 1, width: 250, height: 100 }} >
          </Image>
        </View>
        <View style={styles.screenContainer}>
          <View style={[styles.screenStyle, (this.props.activeItemKey == 'Avatar') ? styles.activeBackgroundColor : null]}>
            <Image
              alt="avatar"
              onClick={() => this.avatar.click()}
              source={{ uri: "http://172.105.113.23:3000/resources/" + this.props.avatar }}
              style={styles.avatarStyle} />
            <Text style={styles.screenTextStyle}>{this.props.name} </Text>
          </View>

          <View style={[styles.screenStyle, (this.props.activeItemKey == 'Profile') ? styles.activeBackgroundColor : null]}>
            <Icon name="md-camera" style={{ color: 'black', marginLeft: 10 }} />
            <Text style={[styles.screenTextStyle, (this.props.activeItemKey == 'ScreenA') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Post')}>Tho</Text>
          </View>

          <View style={[styles.screenStyle, (this.props.activeItemKey == 'ScreenB') ? styles.activeBackgroundColor : null]}>
            <Text style={[styles.screenTextStyle, (this.props.activeItemKey == 'ScreenB') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Post')}>Screen B</Text>
          </View>

          {/* <View style={[styles.screenStyle, (this.props.activeItemKey=='ScreenC') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='ScreenC') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('ScreenC')}>Screen C</Text>
                </View> */}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  headerContainer: {
    height: 150,
  },
  headerText: {
    color: '#fff8f8',
  },
  screenContainer: {
    paddingTop: 20,
    width: '100%',
  },
  avatarStyle: {
    width: 70,
    height: 70
  },
  screenStyle: {
    height: 50,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  screenTextStyle: {
    fontSize: 20,
    marginLeft: 20,
    textAlign: 'center'
  },
  selectedTextStyle: {
    fontWeight: 'bold',
    color: '#00adff'
  },
  activeBackgroundColor: {
    backgroundColor: 'grey'
  }
});

const mapStateToProps = ({
  auth: {
    user: { name, permission, exp, username, avatar, isVerified }
  }
}) => ({ name, permission, exp, username, avatar, isVerified });

const mapDispatchToProps = dispatch => ({
  uploadAvatar: avatar => dispatch(userActions.uploadAvatar(avatar))
});

export default 
connect(
  mapStateToProps,
  mapDispatchToProps
)(drawerContentComponents);
