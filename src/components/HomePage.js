import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, BackHandler, RefreshControl } from 'react-native';
import { Input, Item, Container, Header, Left, Right, Icon, Body, Title } from 'native-base';
import { joinEvent, unjoinEvent } from '../services/event.service';
import { connect } from 'react-redux';
import { getNewfeed } from "../services/newsfeed";
import Post from './post/PostDetail';
class HomeScreen extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  state = {
    data: [],
    update: false,
    doubleBackToExitPressedOnce: false,
    refreshing: true,
  };

  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    );
  }


  componentDidMount() {
    getNewfeed(0)
      .then(data => {
        this.setState(data);
        this.setState({ refreshing: false })
      })
      .catch(e => console.log(e));
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    );

  };

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  handleBackPress = () => {
    if (this.state.doubleBackToExitPressedOnce) {
      BackHandler.exitApp();
    }
    else if (this.props.navigation.state.routeName === 'Home') {
      this.scrollListReftop.scrollTo({ x: 0, y: 0, animated: true })
      this.setState({ doubleBackToExitPressedOnce: true });
      // BackHandler.exitApp();
      setTimeout(() => {
        this.setState({ doubleBackToExitPressedOnce: false });
      }, 2000);
      return true;
    }
  }
  onRefresh() {
    //Clear old data of the list
    this.setState({ data: [], refreshing: true });
    //Call the Service to get the latest data
    getNewfeed(0)
      .then(data => {
        this.setState(data);
        this.setState({ refreshing: false })
      })
      .catch(e => console.log(e));
  }
  onPostTypeChanged = async postType => {
    const data = await getNewfeed(postType)

    if (postType !== "ALL") {
      console.log(postType)
      this.setState({
        data: data.data.filter(
          d => d.type === postType
        )
      });
    } else {
      this.setState({ data: data.data })
    }


  };

  // successReport(reporter, object, objectModel, content) {
  //   const data = {
  //     reporter: reporter,
  //     object: object,
  //     objectModel: objectModel,
  //     content: content
  //   };
  //   reportPost(data);
  // }
  joinToEvent = async id => {
    await joinEvent(id);
    getNewfeed(0)
      .then(data => {
        this.setState(data);
      })
      .catch(e => console.log(e));
  };
  unjoinEvent = async id => {
    await unjoinEvent(id);
    getNewfeed(0)
      .then(data => {
        this.setState(data);
      })
      .catch(e => console.log(e));
  };

  clickHandler = () => {
    { this.navigateToScreen('NewPost') }
  };

  navigateToScreen = (route) => (
    () => {
      const navigateAction = NavigationActions.navigate({
        routeName: route
      });
      this.props.navigation.dispatch(navigateAction);
    })

  render() {
    return (
      <Container>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />}
        onPostTypeChanged={this.onPostTypeChanged}
        stickyHeaderIndices={[0]}
        ref={(ref) => { this.scrollListReftop = ref; }}
      >

        <View>

          <Header  rounded style={{ elevation: 0, backgroundColor: '#4ab785' }} androidStatusBarColor="#4ab785">
            <Left style={{ flex: 0, alignContent: 'flex-start' }}>
              <Icon onPress={() => this.props.navigation.openDrawer()} name="md-menu" style={{ color: 'white', marginRight: 15 }} />
            </Left>
            <Body style={{ marginLeft: 15, marginRight: 15 }}>
              <Title>{this.props.name} </Title>
          </Body>
            {/* <Item style={{ marginLeft: 15, marginRight: 15 }}>
              <Icon name="ios-search" />
              <Input placeholder="Tìm kiếm" />
            </Item> */}

            <Right style={{ flex: 0 }}>
              <Icon name="md-notifications" style={{ color: 'white' }} />
            </Right>
          </Header>
          
          </View>
          
          {this.state.data.map(post => (
            <Post
              key={post._id}
              {...post}
              joinToEvent={this.joinToEvent}
              unjoinEvent={this.unjoinEvent}
              navigation={this.props.navigation}
            />
          ))}
      
  
      </ScrollView>
  <TouchableOpacity
  activeOpacity={0.7}
  onPress={this.navigateToScreen('NewPost')}
  style={styles.TouchableOpacityStyle}>
  <Image
    //We are making FAB using TouchableOpacity with an image
    //We are using online image here
    source={require('../../assets/images/addicon.png')}
    //You can use you project image Example below
    //source={require('./images/float-add-icon.png')}
    style={styles.FloatingButtonStyle}
  />
  
</TouchableOpacity>
</Container>
    );
  }
}

const styles = StyleSheet.create({

  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});

const mapStateToProps = ({
  auth: {
    user: { name, permission, exp, avatar }
  }
}) => ({ name, permission, exp, avatar });

export default (connect(mapStateToProps)(HomeScreen));
