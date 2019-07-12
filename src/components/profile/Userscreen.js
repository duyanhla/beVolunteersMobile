import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  BackHandler,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left, 
  Body,
  Right,
  Item,
  Input,
  Text
} from 'native-base';
import { CardSection } from '../common';
import format from 'date-fns/format';

const SCREEN_WIDTH = Dimensions.get('window').width;

const IMAGE_SIZE = SCREEN_WIDTH - 80;


class Userscreen extends Component {

  render() {
    return (
      <Container>
          
        <Header searchBar rounded style={{ elevation: 0, backgroundColor: '#004916' }}>
          <Left style={{ flex: 0, alignContent: 'flex-start' }}>
            <Icon
              onPress={() => this.props.navigation.goBack()}
              name='arrow-back'
              style={{ color: 'white' }} />
          </Left>

          <Item style={{ marginLeft: 15, marginRight: 15 }}>
            <Icon name="ios-search" />
            <Input placeholder="Tìm kiếm" />
          </Item>

          <Right style={{ flex: 0 }}>
            <Icon name="md-notifications" style={{ color: 'white' }} />
          </Right>
        </Header>

        <View style={{
            justifyContent: 'center',
            alignItems: 'center'}}>
          <Image
            alt="avatar"
            source={{ uri: "http://172.105.113.23:3000/resources/" + this.props.user.avatar }}
            style={styles.avatarStyle} />
        </View>

        <View>
          <Text style={{
            fontSize: 30,
            textAlign: 'center',
            color: 'green'
          }}>{this.props.user.name} </Text>

          <CardSection>
            <Icon
              name="check-circle"
              type='FontAwesome'
              size={25}
              style={{ color: 'green',marginLeft:80 }}
            />
          {this.props.user.isVerified === true ? (
            <Text>
              Tài khoản - Đã được xác thực
                </Text>
          ) : (
              <Text>
                Tài khoản -Chưa được xác thực
              </Text>
            )}
            </CardSection>

            <CardSection style={{ marginTop: 20 }}>
            <Icon
              name="phone"
              type='FontAwesome'
              size={25}
              style={{ color: 'green',marginLeft:14 }}
            />
            <Text style={styles.TextStyle}>{this.props.user.phone}</Text>
            </CardSection>

            <CardSection style={{ marginTop: 20 }}>
            <Icon
              name="email"
              type='MaterialIcons'
              size={25}
              style={{ color: 'green',marginLeft:10 }}
            />
            <Text style={styles.TextStyle}>{this.props.user.email}</Text>
            </CardSection>

            <CardSection style={{ marginTop: 20 }}>
            <Icon
              name="calendar"
              type='FontAwesome'
              size={25}
              style={{ color: 'green',marginLeft:10 }}
            />
            <Text style={styles.TextStyle}>{format(new Date(this.props.user.dob), "DD/MM/YYYY")}</Text>
            </CardSection>
        </View>


      </Container>
    );
  }
}
const styles = StyleSheet.create({
  statusBar: {
    height: 10,
  },
  nameHeader: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
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
    width: IMAGE_SIZE-120,
    height: IMAGE_SIZE-120,
    marginTop: 20,
    borderRadius: 400/ 2,
  },
  screenStyle: {
    height: 100,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  TextStyle: {
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 20,
  },
  activeBackgroundColor: {
    backgroundColor: 'grey'
  }
});

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(mapStateToProps)(Userscreen);
