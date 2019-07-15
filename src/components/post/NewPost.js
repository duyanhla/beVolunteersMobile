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
import ImagePicker from 'react-native-image-picker';

const margin = 20;
const imgInterval = 5;
const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_SIZE = SCREEN_WIDTH - 80;


class NewPost extends Component {

  state = {
    description: "",
    address: "",
    type: "PERSONAL_ACTIVITY",
    filePath: {},
    selected: undefined,
    imageSource: []
  }


    constructor(props){
    super(props);
    this.onDeschange = "";
    this.onAddresschange="";
  }

  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
 
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source, 
          image: [source]
        });
      }
    });
  };

  onValueChange(value) {
    this.setState({
      selected: value,
      type: value
    });
  }


  onFieldChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    postServices.createPost(this.state).then(({ data: { _id } }) => {
      postServices.updateImage(_id, this.state.image).then((res) => {
        // this.setState({ ...initialState });
        Alert.alert('Tạo bài viết thành công.');
      })
      
    });
    this.props.navigation.goBack()
  };

  render() {

    return (
      <Container>
        <Header searchBar rounded style={{ elevation: 0, backgroundColor: '#4AB785' }} androidStatusBarColor="#4ab785">
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
            <Button 
            hasText 
            transparent
            onPress={this.onSubmit}
            >

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
                  onChange={this.onValueChange}
                  value={this.state.type}
                >
                  <Picker.Item label="Kỉ niệm" value="PERSONAL_ACTIVITY" />
                  <Picker.Item label="Địa điểm"  value="PLACE" />
                </Picker>
                <Textarea 
                autoFocus style={{ flex: 1 }} 
                rowSpan={7} 
                placeholder="Nội dung bạn muốn chia sẻ"
                onChange={this.onFieldChanged}
                onChangeText={(description) => this.setState({description})}
                value={this.state.description}
                 />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                <Icon active name='home' />
                <Input 
                placeholder='Địa điểm'
                onChange={this.onFieldChanged}
                onChangeText={(address) => this.setState({address})}
                value={this.state.address}
                />
                </View>
              </View>

            </Form>
          </CardSection>
          <View>
                <Image
                  source={{ uri: this.state.filePath.uri }}
                  style={{ width: 200, height: 200 }}
                />  
              </View>
        </Content>

        <Footer>
          <FooterTab style={{backgroundColor: '#4AB785' }}>
            <Button onPress={this.chooseFile.bind(this)}>
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