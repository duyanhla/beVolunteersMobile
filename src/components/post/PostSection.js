import React, { Component } from 'react'
import PostDetail from '../post/PostDetail';
import { getSpecificPost } from '../../services/post.service';
import { Button,Container,Header,Left,Right,Icon,Text } from 'native-base';
import { View } from 'react-native';
import { DrawerActions } from 'react-navigation';

class PostSection extends Component {
  
    state = {
        post: undefined
    }

    componentDidMount = async () => {
        // let { postId } = this.props.match.params;
        try {
            const data = await getSpecificPost('5cfb2c9ccb5d2b404d1936e6');
            this.setState({ post: data });

        } catch {
            this.setState({ post: false });
        }
    }

    constructor(props){
      super(props);
      this.props.navigation.dispatch(DrawerActions.openDrawer());
      this.props.navigation.dispatch(DrawerActions.closeDrawer());
  }
  render() {

    if (this.state.post === false) {
      // return <Text>aa </Text>
    }

    if (this.state.post !== undefined) {
      return (
        <Container>
          <Header style={{ backgroundColor: '#004916' }}>
            <Left style={{ flexDirection: 'row' }}>
              <Icon onPress={() => this.props.navigation.openDrawer()} name="md-menu" style={{ color: 'white', marginRight: 15 }} />
            </Left>
            <Right>
              <Icon name="md-camera" style={{ color: 'white' }} />
            </Right>
          </Header>
      

        
          <PostDetail {...this.state.post.data.post} />
    
        </Container>

      );
    }

    return null;
  }
}

export default PostSection;