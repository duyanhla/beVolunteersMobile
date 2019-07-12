import React, { Component } from 'react'
import { getSpecificPost } from '../../services/post.service';
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
  Left, 
  Body,
  Right,
  Input,
  Item
} from 'native-base';
import { View, Image,Dimensions } from 'react-native';
import { connect } from 'react-redux';
import PostHeader from './PostHeader';
import { CardSection, Spinner } from '../common';

const windowWidth = Dimensions.get('window').width;
const margin = 20;
const imgInterval = 5;


class PostSection extends Component {
  
    state = {
        post: undefined,
        loading: true,
    }


    constructor(props){
    super(props);
  }

  componentWillMount() {
    const { navigation } = this.props;
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({loading:true});
    });
   
  }
  componentDidMount() {
   
    //Here is the Trick
    const { navigation } = this.props;
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getPost();
    });
  }
  componentWillUnmount() {
    // Remove the event listener before removing the screen from the stack
    this.focusListener.remove();
   
  }

  async getPost()
  {
    const { navigation } = this.props;
    let PostId = navigation.getParam('PostId', 'NO-ID');
       try {
           const data = await getSpecificPost(PostId);
           this.setState({ post: data, loading: false });

       } catch {
          this.setState({ post: false });
       }
  }
  render() {
    if (this.state.post === false) {
      // return <Text>aa </Text>
    }
    if (this.state.post !== undefined) {
      return (
          <Container>
           <Header searchBar rounded style={{ elevation: 0, backgroundColor: '#004916' }}>
          <Left style={{ flex: 0, alignContent: 'flex-start' }}>
            <Icon
              onPress={() => this.props.navigation.goBack() }
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
         {this.state.loading === true? (
           <CardSection>
             <Spinner />
           </CardSection>
         ) : 
         (
          <Content>
            <Card style={{ flex: 0 }}>
              <PostHeader
                {...this.state.post.data.post}
                // successReport={this.props.successReport}
                // reporter={this.props.myUser._id}
                object={this.state.post.data.post._id}
                objectModel={this.state.post.data.post.type}
              />

              <CardItem >
                <Body>
                  <Image source={{ uri: 'http://172.105.113.23:3000/resources/' + this.state.post.data.post.filenames[0] }}
                    style={{
                      width: (windowWidth),
                      height: (windowWidth),
                      marginLeft: -20,
                      marginBottom: imgInterval,
                      marginRight: imgInterval,

                    }} />
                  <Text>
                    {this.state.post.data.post.description}
                  </Text>
                </Body>
              </CardItem>

            </Card>
          </Content>
         )}
          </Container>
      );
    }

    return null;
  }
}

const mapStateToProps = ({ auth: { user } }) => ({ myUser: user });

export default connect(mapStateToProps)(PostSection);