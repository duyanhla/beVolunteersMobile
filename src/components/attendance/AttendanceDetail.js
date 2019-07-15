import React, { Component } from 'react';
import { Image, View, Button, Text } from 'react-native';
import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Input,
  Item,
  Icon,
  Left, Body
} from 'native-base';
import Axios from "axios";
import { AsyncStorage,Dimensions } from 'react-native';
import format from 'date-fns/format';
import PostHeader from '../post/PostHeader';
import Modal from "react-native-modal";
import { getAllCheckinUser } from "../../services/event.service";

const windowWidth = Dimensions.get('window').width;
const margin = 20;
const imgInterval = 5;

class AttendanceDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCheckin: false,
      CodeCheckin: "",
      checkinStatus: false,
      listChecked: [],
      startDate: new Date(),

    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleModal = async () => {
    const checkinStatus = await this.props.getStatusCheckinToday(
      this.props._id
    );
    this.setState({ checkinStatus });
    let listChecked = await getAllCheckinUser(
      this.props._id,
      this.props.myUser.username
    );
    listChecked = listChecked.data.filter(day => {
      return day.isPresent === true;
    });
    await this.setState({ listChecked: listChecked.map(day => { return new Date(day.date) }) });
    this.setState({ modalCheckin: !this.state.modalCheckin });

  };

  OnClickSuccessCheckin() {
    this.setState({
      modalCheckin: !this.state.modalCheckin
    });
    this.props.successCheckin(
      this.props._id,
      this.state.startDate,
      this.state.CodeCheckin
    );

  }

  render() {
    console.log(this.state)
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

                <View style={{ flex: 1 }}>
                  <Button title="Nhập mã điểm danh" onPress={this.toggleModal.bind(this)} />
                  <Modal
                  isVisible={this.state.modalCheckin}
                  backdropColor={'white'}
                  backdropOpacity={0.90}
                  animationIn='slideInUp'
                  animationOut='slideOutDown'
                  onSwipeComplete={() => this.setState({ modalCheckin: false })}
                  swipeDirection="left"
                  onBackButtonPress={() => this.setState({ modalCheckin: false })}
                  >
                    <View style={{
                      flex: 1,
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <View style={{ width: 300, height: 100 }}>
                        <Text style = {{ fontSize: 20 , color : 'black'}}>Nhập mã điểm danh hôm nay</Text>
                        <Item>
                          <Icon active name='code' />
                          <Input placeholder='mã'
                          name="CodeCheckin"
                          onChange={this.onChange}
                          onChangeText={(CodeCheckin) => this.setState({CodeCheckin})}
                          />
                        </Item>
                      </View>
                      <View style={{ width: 200, height: 50 }}>
                        <Button color="#4ab785" 
                        title={this.state.checkinStatus ? 'Hôm nay bạn đã điểm danh rồi' : 'Xác nhận'} 
                        onPress={this.state.checkinStatus ? this.toggleModal  : this.OnClickSuccessCheckin.bind(this)} />
                        <View style={{ marginTop:30 }}>
                        <Button  color="#f2541a" title="Hủy" onPress={this.toggleModal} />
                        </View>
                        </View>
                    </View>
                  </Modal>
                </View>

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