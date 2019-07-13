import React, { Component } from 'react'
import { getSpecificEvents, getSpecificPost } from '../../services/post.service';
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
  Item,
  Input,
  Title
} from 'native-base';
import { View, Image,Dimensions } from 'react-native';
import { connect } from 'react-redux';
import PostHeader from '../post/PostHeader';
import format from 'date-fns/format';
import { CardSection, Spinner } from '../common';

const windowWidth = Dimensions.get('window').width;
const margin = 20;
const imgInterval = 5;


class EventSection extends Component {
  
    state = {
        event: undefined,
        loading:true
    }

    checkJoinEvent = (_id, _ids) => {
      return _ids.find(i => i._id === _id);
    };

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
          const  data  = await getSpecificEvents(PostId);
          this.setState({ event: data.data.event,loading:false });
      } catch {
          this.setState({ event: false });
      }
  }
    
    constructor(props){
      super(props);
  }
  render() {
    if (this.state.event === false) {
      // return <Text>aa </Text>
    }
    if (this.state.event !== undefined) {
      return (
          <Container>
           <Header searchBar rounded style={{ elevation: 0, backgroundColor: '#004916' }}>
          <Left style={{ flex: 0, alignContent: 'flex-start' }}>
            <Icon
              onPress={() => this.props.navigation.goBack()}
              name='arrow-back'
              style={{ color: 'white' }} />
          </Left>

          <Body style={{ marginLeft: 15, marginRight: 15 }}>
              <Title>{this.state.event.publisher.name} </Title>
          </Body>

          <Right style={{ flex: 0 }}>
            <Icon name="md-notifications" style={{ color: 'white' }} />
          </Right>
        </Header>

        {this.state.loading === true? (
           <CardSection>
             <Spinner />
           </CardSection>
         ) : (
          <Content>
            <Card style={{ flex: 0 }}>
              <PostHeader
                {...this.state.event}
                user={this.state.event.publisher}
                // successReport={this.props.successReport}
                // reporter={this.props.myUser._id}
                object={this.state.event._id}
                objectModel={this.state.event.type}
              />
              <Text>Thời gian: </Text>
              <View style={{ flex:1 ,flexDirection:'row'}}>
              <Text>
                 Từ {format(new Date(this.state.event.starttime), "DD/MM/YYYY")}
              </Text>
              <Text>  </Text>
              <Text>
                 Đến {format(new Date(this.state.event.endtime), "DD/MM/YYYY")}
              </Text>
              </View>
              <Text>Số lượng: </Text>
              <Text>
                {this.state.event.volunteers.length}/
                        {this.state.event.numVolunteers} Tình nguyện viên
              </Text>

              <CardItem >
                <Body>
                  <Image source={{ uri: 'http://172.105.113.23:3000/resources/' + this.state.event.filenames[0] }}
                    style={{
                      width: (windowWidth),
                      height: (windowWidth),
                      marginLeft: -20,
                      marginBottom: imgInterval,
                      marginRight: imgInterval,

                    }} />
                  <Text>
                    {this.state.event.description}
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

export default connect(mapStateToProps)(EventSection);