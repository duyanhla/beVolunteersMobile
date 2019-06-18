import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { connect } from "react-redux";
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
import { AsyncStorage } from 'react-native';
import { CardSection } from '../common/CardSection';
import format from 'date-fns/format';
import PostHeader from './PostHeader';
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

  // componentDidMount = () => {
  //   Axios.get(`/posts/${this.props._id}/comments`, {
  //     headers: { "x-access-token": AsyncStorage.getItem("token") }
  //   })
  //     .then(({ data }) => {
  //       this.setState({ comments: data });
  //     })
  //     .catch(err => {
  //       alert(err);
  //     });
  // };

  handleCommentOnChange = e => {
    this.setState({ comment: e.target.value });
  };

  handleCommentOnSubmit = e => {
    e.preventDefault();

    const { _id, permisison, avatar } = this.props.myUser;
    Axios.post(
      "/comments",
      {
        user: _id,
        userModel: permisison,
        object: this.props._id,
        objectModel: "Post",
        content: this.state.comment
      },
      {
        headers: {
          "x-access-token": AsyncStorage.getItem("token")
        }
      }
    )
      .then(() => {
        this.setState(prevState => ({
          comments: [
            { name: this.props.user.name, content: prevState.comment, avatar, isVerified: this.props.myUser.isVerified },
            ...prevState.comments
          ],
          comment: ""
        }));
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    const { activeIndex } = this.state;

    if (this.props.type === "EVENT") {
      console.log(this.props.publisher)
      this.setState = ({ user: this.props.publisher })
    }

    return (
      <Container >
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
            <CardItem>
              <Body>
                <Image source={{ uri: 'http://172.105.113.23:3000/resources/' + this.props.filenames[0] }} style={{ height: 200, width: 200, flex: 1 }} />
                <Text>
                  {this.props.description}
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                {/* {this.props.type === "EVENT" && (
                  <View>
                    {this.checkJoinEvent(
                      this.props.myUser._id,
                      this.props.volunteers
                    ) ? (
                        <Button
                          onPress={() => this.props.unjoinEvent(this.props._id)}
                        >
                          Hủy
                    </Button>
                      ) : (
                        <Button
                          onPress={() => this.props.joinToEvent(this.props._id)}
                          disabled={this.props.myUser.isVerified === false || this.props.myUser.permisstion != "USER"}
                        >
                          Tham gia
                    </Button>
                      )}


                  </View>
                )} */}
                {/* {this.props.type === "PLACE" && (
                  <Button>
                    Tạo event
                  </Button>
              )}

                {this.props.type === 'EVENT'?   
                <Button color="success">
                  Xem thêm
                </Button>
  
              :(  
                 <Button color="success" className="mr-1 success p-2">
                  Xem thêm
                 </Button>
              )
              }
             
              {this.props.type === "EVENT" && (
                  <Button
                   // onPress={this.togglePayment}
                  >
                    Quyên góp
                  </Button>
              )} */}

              </Body>
            </CardItem>

          </Card>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = ({ auth: { user } }) => ({ myUser: user });

export default connect(mapStateToProps)(PostDetail);

