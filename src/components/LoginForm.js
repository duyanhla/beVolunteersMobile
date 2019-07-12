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
  ScrollView,
  BackHandler,
  Alert
} from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { Card, CardSection, Spinner} from './common';
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux';
import { Picker } from 'native-base';
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

  state= {
    date:'',
    error:'',
    permission: 'USER',
    username: "",
    password: "",
    rePassword:"",
    name: "",
    phone: "",
    dob: "",
    email: "",
    gender: "Nam",
    selected2: undefined
  };

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

  onFormSubmit = async e => {
    e.preventDefault();
    try {
      if (this.state.password === this.state.rePassword){
        const data = await createUser({ ...this.state }).then(response => { 
          Message.success("Tạo tài khoản thành công")
        })
        .catch(error => {
          Message.error("Tạo tài khoản thất bại")
        });
      }else{
        Message.error("Mật khẩu nhập lại không đúng")
      }
    } catch (error) {
      console.error(error);
    }

  };

  onUsernameChange(text) {
    this.props.usernameChanged(text)
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text)
  }

  onButtonPress() {
    const { username, password } = this.props;
    this.props.loginUser({ username, password });
  }

  selectCategory(number) {
    LayoutAnimation.easeInEaseOut();
    this.props.categoryChanged(number);
  }

  renderButton(isLoginPage) {
    return (
      <Button 
        onPress={this.onButtonPress.bind(this)}
        buttonStyle={styles.loginButton}
        containerStyle={{ marginTop: 2, flex: 0 }}
        titleStyle={styles.loginTextButton}
        loading={this.props.loading}
        error={''}
        activeOpacity={0.8}
        title={isLoginPage ? 'LOGIN' : 'SIGN UP'}
      />
      
    );
  }
  render() {
    const isLoginPage = this.props.selectedCategory === 0;
    const isSignUpPage = this.props.selectedCategory === 1;
    return (
      
      <View style={styles.container}>
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
                    title={'Login'}
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
                  title={'Sign up'}
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
                    autoFocus={false}
                    containerStyle={{
                      borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                    }}
                    inputStyle={{ marginLeft: 10 }}
                    autoCapitalize="none"
                    placeholder="username"
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
                    placeholder="password"
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
                        inputStyle={{ marginLeft: 10 }}
                        placeholder={'Confirm password'}
                        name="rePassword"
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
                        keyboardType="email-address"
                        returnKeyType={'done'}
                        blurOnSubmit={true}
                        containerStyle={{
                          marginTop: 16,
                          borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                        }}
                        inputStyle={{ marginLeft: 10 }}
                        placeholder={'Email'}
                        name="email"
                        onChange={this.onFieldChanged}
                      />
                    </CardSection>

                    <CardSection>
                      <Input
                        leftIcon={
                          <Icon
                            name="phone"
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
                        placeholder={'Số điện thoại'}
                        onChange={this.onFieldChanged}
                        name="phone"
                      />
                    </CardSection>

                    <CardSection>
                      <DatePicker
                        leftIcon={
                          <Icon
                            name="calendar"
                            type="font-awesome"
                            color="rgba(0, 0, 0, 0.38)"
                            size={25}
                            style={{ backgroundColor: 'transparent' }}
                          />
                        }
                        date={this.state.date}
                        mode="date"
                        style={{ flex: 1 }}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        placeholder="Chọn ngày sinh"
                        onDateChange={(date) => { this.setState({ date: date }) }}
                        format="DD-MM-YYYY"
                        minDate="01-01-1960"
                        maxDate="01-01-2018"
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 20
                          },
                        }}
                        name="dob"
                        onChange={this.onFieldChanged}
                      />
                    </CardSection>


                    <CardSection>
                      <Picker
                        onChange={this.onFieldChanged}
                        name="gender"
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Select your SIM"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        value={this.state.gender}
                        selectedValue={this.state.selected2}
                        onChange={this.onFieldChanged}
                        onValueChange={this.onValueChange2.bind(this)}
                      >
                        <Picker.Item label="Nam" value="key0" />
                        <Picker.Item label="Nữ" value="key1" />
                      </Picker>
                    </CardSection>
                    
                  </View>
                  )}     
                <Text>
                  {this.props.error}
                </Text>

                <CardSection>
                  {this.renderButton(isLoginPage)}
                </CardSection>
                
                
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
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


