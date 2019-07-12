import React, { Component } from 'react';
import { Image, View, Modal } from 'react-native';
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
import Axios from "axios";
import { AsyncStorage,Dimensions } from 'react-native';
import format from 'date-fns/format';
import PostHeader from '../post/PostHeader';

const windowWidth = Dimensions.get('window').width;
const margin = 20;
const imgInterval = 5;

class AttendanceDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCheckin: false,
      CodeCheckin: "",
      startDate: new Date(),
    };
  }
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  async OnClickSuccessCheckin () {
    await this.setState({
      modalCheckin: !this.state.modalCheckin
    });
    this.props.successCheckin(
      this.props._id,
      this.state.startDate,
      this.state.CodeCheckin
    );
  }

  render() {
    const { activeIndex } = this.state;
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
              <Text>
                {this.props.description}
              </Text>
            </Body>
          </CardItem>

          <CardItem>

            {this.props.type === "EVENT" && (
              <CardItem>
                <Button small
                  iconLeft
                  onPress={() => this.props.unjoinEvent(this.props._id)}
                  style={{ marginLeft: -15 }}
                >
                  <Icon name="close"
                    type="FontAwesome" />
                  <Text>Điểm danh</Text>
                </Button>

              </CardItem>

            )}
          </CardItem>
        </Card>
      </Content>

    )
  }

}


const mapStateToProps = ({ auth: { user } }) => ({ myUser: user });

export default connect(mapStateToProps)(AttendanceDetail);