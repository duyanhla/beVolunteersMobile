import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Input, Item, Container, Header, Left,
  Right, Icon, Text, CardItem, Thumbnail, Body, Title
} from 'native-base';
import { connect } from 'react-redux';
import { getEventJoined } from "../../services/event.service";
import Post from './AttendanceDetail';


class HomeScreen extends Component {
  state = {
    data: [],
  };

  componentDidMount = () => {
    getEventJoined(this.props.username)
      .then(data => {

        this.setState({ data: data.data });
        console.log(data)
      })
      .catch(e => console.log(e));
  };


  successCheckin(eventId, date, code) {
    console.log(eventId)
    console.log(new Date(date))
    console.log(code)

  }

  // successReport(reporter, object, objectModel, content) {
  //   const data = {
  //     reporter: reporter,
  //     object: object,
  //     objectModel: objectModel,
  //     content: content
  //   };
  //   reportPost(data);
  // }


  render() {
    return (
      <ScrollView
        onPostTypeChanged={this.onPostTypeChanged}
        stickyHeaderIndices={[0]}
      >
        <Container>

          <Header searchBar rounded style={{ elevation: 0, backgroundColor: '#004916' }}>
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
            />
          ))}
        </Container>
      </ScrollView>
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
