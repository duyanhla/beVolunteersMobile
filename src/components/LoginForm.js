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
} from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { Card, CardSection, Spinner} from './common';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, categoryChanged } from '../actions';
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

  onEmailChange(text) {
    this.props.emailChanged(text)
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text)
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
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
        containerStyle={{ marginTop: 32, flex: 0 }}
        titleStyle={styles.loginTextButton}
        loading={this.props.loading}
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
                        name="envelope-o"
                        type="font-awesome"
                        color="rgba(0, 0, 0, 0.38)"
                        size={25}
                        style={{ backgroundColor: 'transparent' }}
                      />
                    }
                    keyboardType="email-address"
                    autoCapitalize="none"
                    keyboardAppearance="light"
                    autoFocus={false}
                    containerStyle={{
                      borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                    }}
                    inputStyle={{ marginLeft: 10 }}
                    autoCapitalize="none"
                    placeholder="email@gmail.com"
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email}
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
                    inputStyle={{ marginLeft: 10 }}
                    secureTextEntry
                    placeholder="password"
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                  />
                </CardSection>
                {isSignUpPage && (
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
                     
  
                      errorMessage={'Please enter the same password'}
                    />
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
    alignItems: 'center',
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
  const { email, password, error, loading, selectedCategory } = auth;
  return { email, password, error, loading, selectedCategory };
};

export default connect(mapStateToProps, { 
  emailChanged, 
  passwordChanged,
  loginUser,
  categoryChanged
})(LoginForm);


