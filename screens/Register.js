import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Picker,
  View,
  Text
} from "react-native";
import { Block, Checkbox, theme } from "galio-framework";

import { Button, 
  Icon, 
  Input, Select } from "../components";
import { Images, argonTheme } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Avatar } from 'react-native-elements';

import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("screen");

const headerImg = require("../assets/imgs/headerLogin.png");

class Register extends React.Component {
  state = {address: ""}
  render() {
    const { navigation } = this.props;

    return (
      <Block flex middle >
        {/* <StatusBar hidden /> */}
        
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex={0.4} middle>
            <ImageBackground source={require("../assets/imgs/headerRegister.png")} resizeMode='contain' style={styles.headerImage}>
                <Block flex middle>
                    <MaterialIcons name='keyboard-backspace' size={40} style={{left: -170, top: -65}}
                                  onPress={() => navigation.goBack()}/>
                </Block>
            </ImageBackground> 
          </Block>

          <Block flex>
            <Block flex={0.15}>
              <Text color="#E1E1E1" size={32} style={{ marginLeft: 15, marginTop: 20, fontWeight: 'bold'}}>
                Create an account
              </Text>
            </Block>
            <Block flex center>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                enabled
              >
                <Block width={width * 0.9} style={{marginTop: 20, marginBottom: 15 }}>
                  <Input
                    borderless
                    placeholder="Your name"
                    iconContent={
                      <Icon
                        size={16}
                        color={'#5E5454'}
                        name="hat-3"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={{backgroundColor: '#333333'}}
                  />
                </Block>
                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                  <Input
                    borderless 
                    placeholder="Email"
                    iconContent={
                      <Icon
                        size={16}
                        color={'#5E5454'}
                        name="ic_mail_24px"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={{backgroundColor: '#333333'}}
                  />
                </Block>

                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                  <Input
                    borderless 
                    placeholder="Phone number"
                    iconContent={
                      <MaterialIcons
                        size={16}
                        color={'#5E5454'}
                        name="phone"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={{backgroundColor: '#333333'}}
                  />
                </Block>

                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#333333',
                      borderRadius: 9
                    }}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        flex: 1,
                        position: 'relative',
                        alignItems: 'center',
                        height: 44,
                        paddingLeft: 15
                      }}>
                      <MaterialIcons name="location-on" size={16} color="#5E5454" style={{marginRight: 10}} />
                      <Picker
                        selectedValue={this.state.district}
                        style={{
                          width: '100%',
                          paddingBottom: 0,
                          backgroundColor: 'transparent',
                          paddingLeft: 0,
                          transform: [{scaleX: 0.77}, {scaleY: 0.77}],
                          position: 'absolute',
                          color: "#cccccc"
                        }}
                        itemStyle={{
                          backgroundColor:"#000000"
                        }}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({district: itemValue})
                        }>
                        <Picker.Item label="Address" value="" />
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                      </Picker>
                    </View>
                  </View>
                </Block>

                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                  <Input
                    password
                    viewPass
                    borderless
                    placeholder="Password"
                    iconContent={
                      <Icon
                        size={16}
                        color={'#5E5454'}
                        name="padlock-unlocked"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={{backgroundColor: '#333333'}}
                  />                 
                </Block> 
                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                  <Input
                    password
                    viewPass
                    borderless
                    placeholder="Re-enter password"
                    iconContent={
                      <Icon
                        size={16}
                        color={'#5E5454'}
                        name="padlock-unlocked"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={{backgroundColor: '#333333'}}
                  />            
                </Block>

                <Block flex middle style={{marginBottom: height * 0.1}}>
                  <Button color="primary" style={styles.loginButton} onPress={() => navigation.navigate("Register")}>
                    <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                      Register
                    </Text>
                  </Button>
                </Block>
              </KeyboardAvoidingView>
            </Block>
          </Block>
        </ImageBackground>
      </Block>  
    );
  }
}

const styles = StyleSheet.create({
  headerImage: {
    //width: '100%',
    //height: undefined,
    //aspectRatio: 1,
    width: width,
    height: height,
    //marginTop: -10,
    //scaleX: 1.2,
    justifyContent:'flex-start',
    borderRadius: 4,
    //elevation: 1,
    //overflow: "hidden"
  },
  registerContainer: {
    width: width * 0.9,  //0.9
    height: height * 0.78,
    backgroundColor: "#05060A", //#F4F5F7
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: "#404957", //argonTheme.COLORS.WHITE
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  loginButton: {
    width: width * 0.5,
    marginTop: 25,
    borderRadius: 10,
  }
});

export default Register;
