import React, { Component } from 'react'
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
  Title, Form, Textarea, Footer, FooterTab, Picker,
} from 'native-base';
import { View, Image, Dimensions, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Spinner } from '../common';
import * as postServices from '../../services/post.service';

const margin = 20;
const imgInterval = 5;
const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_SIZE = SCREEN_WIDTH - 80;

const initialState = {
  image: [],
  description: "",
  address: "",
  type: "PERSONAL_ACTIVITY",
};


class NewPost extends Component {
  
    state = {
        post: undefined,
        selected: undefined
    }


    constructor(props){
    super(props);
   // this.inputImage = createRef();

  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  handleImageChoose = () => {
  };

  onTypeChange = e => {
    this.setState({ type: e.target.value });
  };

  onFieldChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    postServices.createPost(this.state).then(({ data: { _id } }) => {
      postServices.updateImage(_id, this.state.image).then(() => {
        this.setState({ ...initialState });
        Alert.alert('Tạo bài viết thành công.');
      })
      
    });
  };

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

          <Body style={{ marginLeft: 15, marginRight: 15 }}>
            <Title>Tạo bài viết</Title>
          </Body>

          <Right style={{ flex: 0 }}>
            <Button hasText transparent>

              <Text>Đăng</Text>
            </Button>

          </Right>
        </Header>
        <Content>
          <CardSection>
            <Form style={{ flex: 1, flexDirection: 'row' }}  >
              <Image
                alt="avatar"
                source={{ uri: "http://172.105.113.23:3000/resources/" + this.props.myUser.avatar }}
                style={styles.avatarStyle} />
              <View>
                <Picker
                  mode="dropdown"
                  placeholder="Loại"
                  placeholderStyle={{ color: "#2874F0" }}
                  note={false}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="Kỉ niệm" value="key0" />
                  <Picker.Item label="Địa điểm" value="key1" />
                </Picker>
                <Textarea autoFocus style={{ flex: 1 }} rowSpan={7} placeholder="Nội dung bạn muốn chia sẻ" />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                <Icon active name='home' />
                <Input placeholder='Địa điểm' />
                </View>
              </View>

            </Form>

          </CardSection>
         
        </Content>

        <Footer>
          <FooterTab style={{backgroundColor: '#004916' }}>
            <Button onPress={this.handleImageChoose()}>
              <Icon name="camera" />
            </Button>
          </FooterTab>
        </Footer>

       
      </Container>
    );

    return null;
  }
}

const styles = StyleSheet.create({
  avatarStyle: {
    width: IMAGE_SIZE-270,
    height: IMAGE_SIZE-270,
    marginTop: 5,
    borderRadius: 400/ 2,
  }
});

const mapStateToProps = ({ auth: { user } }) => ({ myUser: user });

export default connect(mapStateToProps)(NewPost);