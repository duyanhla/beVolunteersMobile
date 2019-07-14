import React, { Component } from 'react';
import { Image, View,TouchableHighlight } from 'react-native';
import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left, Body
} from 'native-base';
import Comment from "./Comment";
import Axios from "axios";
import { AsyncStorage,Dimensions } from 'react-native';
import format from 'date-fns/format';
import PostHeader from './PostHeader';

const windowWidth = Dimensions.get('window').width;
const margin = 20;
const imgInterval = 5;

class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeIndex: 0,
      items: [],
      dropdownOpen: false,
      paymentOpen: false,
      comment: ""
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    // this.toggleMenuPost = this.toggleMenuPost.bind(this);
    // this.togglePayment = this.togglePayment.bind(this);
  }
  // toggleMenuPost() {
  //   this.setState({
  //     dropdownOpen: !this.state.dropdownOpen
  //   });
  // }
  // togglePayment() {
  //   this.setState({
  //     paymentOpen: !this.state.paymentOpen
  //   });
  // }
  navigateToScreen = ( route ) =>(
    () => {
    const navigateAction = NavigationActions.navigate({
        routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
})

  checkJoinEvent = (_id, _ids) => {
    return _ids.find(i => i._id === _id);
  };
  clearArray() {
    this.state.items = [];
  }
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === this.state.items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.state.items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
   
    const { activeIndex } = this.state;
    if (this.props.type === "EVENT") {
      this.setState = ({ user: this.props.publisher })
    }
    return (
     
      <Content>
        <Card style={{ flex: 0 }}>

          {this.props.type === "EVENT" ? (
            <PostHeader
              {...this.props}
              user={this.props.publisher}
              // successReport={this.props.successReport}
              // reporter={this.props.myUser._id}
              object={this.props._id}
              objectModel={this.props.type}
            />
          ) : (
              <PostHeader
                {...this.props}
                // successReport={this.props.successReport}
                // reporter={this.props.myUser._id}
                object={this.props._id}
                objectModel={this.props.type}
              />
            )}
          <CardItem >
            <Body>    
              <Image source={{ uri: 'http://172.105.113.23:3000/resources/' + this.props.filenames[0] }} 
              style={{
                width: (windowWidth),
                height: (windowWidth),
                marginLeft: -20,
                marginBottom: imgInterval,
                marginRight: imgInterval,
                
              }} />
              <Text numberOfLines={3} ellipsizeMode="tail">
                {this.props.description}
              </Text>
            </Body>
          </CardItem>

          <CardItem>

            {this.props.type === "EVENT" && (
              <CardItem>
                {this.checkJoinEvent(
                  this.props.myUser._id,
                  this.props.volunteers
                ) ?
                  <Button warning
                    iconLeft
                    onPress={() => this.props.unjoinEvent(this.props._id)}
                    style={{marginLeft:-15}}
                  >
                    <Icon name="close"
                      type="FontAwesome" />
                    <Text>Hủy</Text>
                  </Button>
                  : (
                    <Button info
                    style={{marginLeft:-15}}
                      onPress={() => this.props.joinToEvent(this.props._id)}
                      disabled={this.props.myUser.isVerified === false || this.props.myUser.permission != "USER"}
                    >
                      <Text>Tham gia</Text>
                    </Button>
                  )}


              </CardItem>
            )}
            {/* {this.props.type === "PLACE" && (
              <CardItem>
                <Button>
                  <Text>Tạo event</Text>
                </Button>
              </CardItem>
            )} */}

            {this.props.type === 'EVENT' ? (
              <CardItem>
                <Button success
                  onPress={() => this.props.navigation.navigate('Event', {
                  PostId: this.props._id
                    })}
              >
                  <Text>Xem thêm</Text>
                </Button>
              </CardItem>
            ) : (
                <CardItem>
                  <Button success
                  style={{marginLeft:-15}}
                  onPress={() => this.props.navigation.navigate('Post', {
                  PostId: this.props._id
                  })}
                  >
                    <Text>Xem thêm</Text>
                  </Button>
                </CardItem>
              )
            }

            {/* {this.props.type === "EVENT" && (
              <CardItem>
                <Button primary
                // onPress={this.togglePayment}
                >
                  <Text>Quyên góp</Text>
                </Button>
              </CardItem>
            )} */}


          </CardItem>

        </Card>
      </Content>

    )
  }
}

const mapStateToProps = ({ auth: { user } }) => ({ myUser: user });

export default connect(mapStateToProps)(PostDetail);

