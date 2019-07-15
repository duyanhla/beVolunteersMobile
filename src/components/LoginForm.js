import React, { Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  BackHandler,
  Alert,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { Card, CardSection, Spinner} from './common';
import { connect } from 'react-redux';
import { createUser } from '../services/user.service';
import { usernameChanged, passwordChanged, loginUser, categoryChanged } from '../actions';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../assets/images/bg_1.jpg');

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);


  const TabSelector = ({ selected }) => {
    return (
      <View style={styles.selectorContainer}>
        <View style={selected && styles.selected} />
      </View>
    );
  };

  TabSelector.propTypes = {
    selected: PropTypes.bool.isRequired,
  };
 
class LoginForm extends Component {

  state = {
    date:'',
    error:'',
    permission: 'USER',
    username: "",
    password: "",
    rePassword:"",
    email: "",
    selected2: undefined,
    userData: {}
  };

  componentWillMount() {
    this.getToken();
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    Alert.alert(
      'Thoát ứng dụng,',
      'Bạn có muốn thoát?',
      [
        {text: 'Không', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Có', onPress: () => BackHandler.exitApp()},
      ],
      { cancelable: false });
      return true;
  }

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  onFieldChanged = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  onUsernameChange(text) {
    this.props.usernameChanged(text)
    this.setState({username : text})
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text)
    this.setState({ password: text })
  }


  onFormSubmit = async e => {
    e.preventDefault();
    try {
      if (this.state.password === this.state.rePassword){
        const data = await createUser({ ...this.state }).then(response => { 
          Alert.alert("Hãy kiểm tra email để xác nhận tài khoản")
          this.selectCategory(0)
        })
        .catch(error => {
          Alert.alert("Tạo tài khoản thất bại")
        });
      }else{
        Alert.alert("Mật khẩu nhập lại không đúng")
      }
    } catch (error) {
      console.error(error);
    }

  };

  onButtonPress() {
    const { username, password } = this.props;
    this.props.loginUser({ username, password });
    let user = {'username': this.state.username, 'password': this.state.password};    
    this.storeToken(user);
  }

  selectCategory(number) {
    LayoutAnimation.easeInEaseOut();
    this.props.categoryChanged(number);
  }

  async storeToken(user) {
    try {
       await AsyncStorage.setItem("userData", JSON.stringify(user));
       console.log(user);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  async getToken() {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      console.log(data);
      if (data != null) 
      {
        this.props.loginUser(data);
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }


  render() {
    const isLoginPage = this.props.selectedCategory === 0;
    const isSignUpPage = this.props.selectedCategory === 1;
    return (
      
      <KeyboardAvoidingView  style={styles.container} behavior="padding" enabled>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <View>
            <KeyboardAvoidingView
              contentContainerStyle={styles.loginContainer}
              behavior="position"
            >

              <View style={styles.titleContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.titleText}>Be</Text>
                </View>
                <View style={{ marginTop: -10, marginLeft: 10 }}>
                  <Text style={styles.titleText}>Volunteers</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                  <Button
                    disabled={this.props.loading}
                    type="clear"
                    activeOpacity={0.7}
                    onPress={() => this.selectCategory(0)}
                    containerStyle={{ flex: 1 }}
                    titleStyle={[
                      styles.categoryText,
                      isLoginPage && styles.selectedCategoryText,
                    ]}
                    title={'Đăng nhập'}
                  />
                  <Button
                    disabled={this.props.loading}
                    type="clear"
                    activeOpacity={0.7}
                    onPress={() => this.selectCategory(1)}
                  containerStyle={{ flex: 1 }}
                  titleStyle={[
                    styles.categoryText,
                    isSignUpPage && styles.selectedCategoryText,
                  ]}
                  title={'Đăng kí'}
                />
              </View>
              <View style={styles.rowSelector}>
                <TabSelector selected={isLoginPage} />
                <TabSelector selected={isSignUpPage} />
              </View>
              <View style={styles.formContainer}>

                <CardSection>
                  <Input
                    leftIcon={
                      <Icon
                        name="user"
                        type="font-awesome"
                        color="rgba(0, 0, 0, 0.38)"
                        size={25}
                        style={{ backgroundColor: 'transparent' }}
                      />
                    }
                    name="username"
                    autoCapitalize="none"
                    keyboardAppearance="light"
                    autoFocus style={{ flex: 1 }} 
                    containerStyle={{
                      borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                    }}
                    inputStyle={{ marginLeft: 10 }}
                    autoCapitalize="none"
                    placeholder="Tài khoản"
                    onChangeText={this.onUsernameChange.bind(this)}
                    value={this.props.username}
                    onChange={this.onFieldChanged}
                  />
                </CardSection>

                <CardSection>
                  <Input
                    leftIcon={
                      <Icon
                        name="lock"
                        type="simple-line-icon"
                        color="#517fa4"
                        size={25}
                        style={{ backgroundColor: 'transparent' }}
                      />
                    }
                    keyboardAppearance="light"
                    autoCapitalize="none"
                    autoCorrect={false}
                    containerStyle={{
                      marginTop: 16,
                      borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                    }}
                    inputStyle={{ marginLeft: 4 }}
                    secureTextEntry
                    name="password"
                    placeholder="Mật khẩu"
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                    onChange={this.onFieldChanged}
                  />
                </CardSection>
                {isSignUpPage && (
                  <View>
                    <CardSection>
                      <Input
                        leftIcon={
                          <Icon
                            name="lock"
                            type="simple-line-icon"
                            color="rgba(0, 0, 0, 0.38)"
                            size={25}
                            style={{ backgroundColor: 'transparent' }}
                          />
                        }
                        secureTextEntry={true}
                        keyboardAppearance="light"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType={'done'}
                        blurOnSubmit={true}
                        containerStyle={{
                          marginTop: 16,
                          borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                        }}
                        inputStyle={{ marginLeft: 11 }}
                        placeholder={'Xác nhận mật khẩu'}
                        name="rePassword"
                        onChangeText={(rePassword) => this.setState({rePassword})}
                        value={this.state.rePassword}
                        onChange={this.onFieldChanged}

                      // errorMessage={'Please enter the same password'}
                      />
                    </CardSection>

                    <CardSection>
                      <Input
                        leftIcon={
                          <Icon
                            name="person"
                            type="ion-icon"
                            color="rgba(0, 0, 0, 0.38)"
                            size={25}
                            style={{ backgroundColor: 'transparent' }}
                          />
                        }
                        keyboardAppearance="light"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType={'done'}
                        blurOnSubmit={true}
                        containerStyle={{
                          marginTop: 16,
                          borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                        }}
                        inputStyle={{ marginLeft: 10 }}
                        placeholder={'Họ và tên'}
                        onChange={this.onFieldChanged}
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                        name="name"

                      />
                    </CardSection>

                    <CardSection>
                      <Input
                        leftIcon={
                          <Icon
                            name="mail"
                            type="ion-icon"
                            color="rgba(0, 0, 0, 0.38)"
                            size={25}
                            style={{ backgroundColor: 'transparent' }}
                          />
                        }
                        keyboardAppearance="light"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        returnKeyType={'done'}
                        blurOnSubmit={true}
                        containerStyle={{
                          marginTop: 16,
                          borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                        }}
                        inputStyle={{ marginLeft: 10 }}
                        placeholder={'email@gmail.com'}
                        onChange={this.onFieldChanged}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        name="email"

                      />
                    </CardSection>

                  </View>
                  )}     
                <Text>
                  {this.props.error}
                </Text>

                <CardSection>
                  <Button
                    onPress={isLoginPage ? this.onButtonPress.bind(this) : this.onFormSubmit}
                    buttonStyle={styles.loginButton}
                    containerStyle={{ marginTop: 2, flex: 0 }}
                    titleStyle={styles.loginTextButton}
                    loading={this.props.loading}
                    error={''}
                    activeOpacity={0.8}
                    title={isLoginPage ? 'Đăng nhập' : 'Đăng ký'}
                  />
                </CardSection>
                
                </View>
              
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowSelector: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'rgba(144, 182, 125, 1)',
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center'
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontFamily: 'light',
    backgroundColor: 'transparent',
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  titleText: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'regular',
    fontWeight: 'bold'
  },
  helpContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = ({ auth }) => {
  const { username, password, error, loading, selectedCategory } = auth;
  return { username, password, error, loading, selectedCategory };
};

export default connect(mapStateToProps, { 
  usernameChanged, 
  passwordChanged,
  loginUser,
  categoryChanged
})(LoginForm);


