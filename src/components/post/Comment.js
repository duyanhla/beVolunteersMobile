import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ListView,
  Platform,
  StyleSheet, 
  Row,
  View,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  TouchableHighlight } from "react-native";

export default class Comment extends Component {
  render() {
    return (
      <View >
        <TouchableOpacity onPress={() => this.onPress()}>
          <View style={styles.commentBox}>
            <Image style={styles.avatar} source={require('../../../assets/images/banner1.png')} />
            <View style={{ flex: 1 }}>
              <Text style={styles.comment}>{this.props.content}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  commentBox: {
    flex: 1,
    flexDirection: 'row',
    //borderColor: 'black',
    //borderWidth: 1,
    padding: 10,
    paddingBottom: 4,
  },
  avatar: {
    borderRadius: 16,
    width: 32,
    height: 32,
    marginRight: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    // lineHeight: 13,
    marginBottom: 4,
  },
  commentTime: {

  },
  comment: {
    fontSize: 14,
    color: '#030303',
    lineHeight: 18,
  },
});