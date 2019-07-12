import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Input,Item,Container,Header,Left,Right,Icon,Text, CardItem, Thumbnail, Body } from 'native-base';
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


  successCheckin(eventId, date, code){
    console.log(eventId)
    console.log(new Date(date))
    console.log(code)
  
  }

  onPostTypeChanged = async postType => {
    const data = await getNewfeed(postType)

    if(postType!=="ALL"){
      console.log(postType)
      this.setState({
        data: data.data.filter(
          d => d.type === postType
        )
      });
    }else{
      this.setState({data:data.data})
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


  render() {
    return (
      <ScrollView
        onPostTypeChanged={this.onPostTypeChanged}
        stickyHeaderIndices={[0]}
      >


        <Header  searchBar rounded style={{ elevation: 0, backgroundColor: '#004916'}}>
          <Left style={{ flex: 0, alignContent: 'flex-start' }}>
            <Icon onPress={() => this.props.navigation.openDrawer()} name="md-menu" style={{ color: 'white', marginRight: 15 }} />
          </Left>

          <Item style={{ marginLeft: 15, marginRight: 15 }}>
            <Icon name="ios-search" />
            <Input placeholder="Tìm kiếm" />
          </Item>

          <Right style={{ flex: 0 }}>
            <Icon name="md-notifications" style={{ color: 'white' }} />
          </Right>
        </Header>

        {this.state.data.map(post => (
          <Post
            key={post._id}
            {...post}
            successCheckin= {this.successCheckin}
          />
        ))}
       
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
