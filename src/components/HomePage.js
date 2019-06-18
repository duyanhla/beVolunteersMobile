import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Button,Container,Header,Left,Right,Icon,Text } from 'native-base';
import { 
   DrawerActions
 } from 'react-navigation';
import { joinEvent, unjoinEvent } from '../services/event.service';
import { connect } from 'react-redux';
import { getNewfeed } from "../services/newsfeed";
import Post from './post/PostDetail';

 class HomeScreen extends Component {
  state = {
    data: [],
    update: false
  };

  componentDidMount = () => {
    getNewfeed(0)
      .then(data => {
        this.setState(data);
      })
      .catch(e => console.log(e));
  };

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

  render() {
    return (
      <ScrollView
        onPostTypeChanged={this.onPostTypeChanged}
      >
        {/* {this.props.permission === "USER" && (
          <NewPost style={{ zIndex: 50, position: "relative" }} />
        )} */}

        {this.state.data.map(post => (
          <Post
            key={post.id}
            {...post}
            joinToEvent={this.joinToEvent}
            unjoinEvent={this.unjoinEvent}
          />
        ))}
      </ScrollView>
    );
  }
}

const mapStateToProps = ({
  auth: {
    user: { name, permission, exp }
  }
}) => ({ name, permission, exp });

export default (connect(mapStateToProps)(HomeScreen));
