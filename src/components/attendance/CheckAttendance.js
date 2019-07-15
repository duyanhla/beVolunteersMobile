import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import {
  Input, Item, Container, Header, Left,
  Right, Icon, Text, CardItem, Thumbnail, Body, Title
} from 'native-base';
import { connect } from 'react-redux';
import { 
  getEventJoined, 
  CheckinUserByCode,  
  getCheckinByDateUser,
 } from "../../services/event.service";
import Post from './AttendanceDetail';
import format from "date-fns/format";


class HomeScreen extends Component {
  state = {
    data: [],
    listChecked: [],
    refreshing: true,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    getEventJoined(this.props.username)
      .then(data => {

        this.setState({ data: data.data });
        this.setState({ refreshing: false })
      })
      .catch(e => console.log(e));
  };


  onRefresh() {
    //Clear old data of the list
    this.setState({ data: [], refreshing: true });
    //Call the Service to get the latest data
    getEventJoined(this.props.username)
    .then(data => {

      this.setState({ data: data.data });
      this.setState({ refreshing: false })
    })
    .catch(e => console.log(e));
  }

  successCheckin = async (eventId,date, code) => {
    const DateFomart = await format(new Date(date), "YYYY-MM-DD").toString();
    const checkList = await getCheckinByDateUser(
      eventId,
      DateFomart,
      this.props.username
    );
    console.log(DateFomart)
    if (checkList.data.length !== 0) {
      // TODO:
      CheckinUserByCode(eventId, checkList.data[0]._id, code);
    }
  };
  getStatusCheckinToday = async eventId => {
    const DateFomart = await format(new Date(), "YYYY-MM-DD").toString();
    const checkList = await getCheckinByDateUser(
      eventId,
      DateFomart,
      this.props.username
    );

    if (checkList.data.length !== 0) {
      return checkList.data[0].isPresent;
    }
    return false;
  };

  render() {
    console.log(this.props)
    return (
      <Container>

      <ScrollView
        onPostTypeChanged={this.onPostTypeChanged}
        stickyHeaderIndices={[0]}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />}
      >

          <Header searchBar rounded style={{ elevation: 0, backgroundColor: '#4ab785' }} androidStatusBarColor="#4ab785">
            <Left style={{ flex: 0, alignContent: 'flex-start' }}>
              <Icon
                onPress={() => this.props.navigation.goBack()}
                name='arrow-back'
                style={{ color: 'white' }} />
            </Left>
            <Body style={{ marginLeft: 15, marginRight: 15 }}>
              <Title>Điểm danh</Title>
            </Body>

            <Right style={{ flex: 0 }}>
              <Icon name="md-notifications" style={{ color: 'white' }} />
            </Right>
          </Header>

          {this.state.data.map(post => (
            <Post
              key={post._id}
              {...post}
              successCheckin={this.successCheckin}
              getStatusCheckinToday={this.getStatusCheckinToday}
            />
          ))}
      </ScrollView>
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
    user: { name, permission, username, avatar }
  }
}) => ({ name, permission, username, avatar });

export default (connect(mapStateToProps)(HomeScreen));
