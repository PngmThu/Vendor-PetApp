import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Picker,
  View,
  ScrollView
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { argonTheme } from "../constants";
import { Button, Icon, Input } from "../components";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Notification from '../models/NotificationModel';

const { width, height } = Dimensions.get("screen");

class Profile extends React.Component {
  state = {address: ""}

  register(){
    let noti = new Notification({
      content: "123",
      time: "14:00",
      vendor: {
        name: 123,
        $key: 111
      }
    })

    noti.resolveData();
  }
  render() {
    const { navigation } = this.props;
    return (
      <Block flex center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >
        <Block flex={0.6} middle >
          <ImageBackground source={require("../assets/imgs/Schedule1.png")} resizeMode='contain' style={styles.headerImage}/>
          <Text color="#ffffff" size={40} style={{ marginLeft: 15, fontFamily: 'ITCKRIST'}}>
            Your info
          </Text>
        </Block>

          <ScrollView>
            <Block flex={0.1} row style={styles.action}>
              <View style={{alignContent:'flex-start', flex:1, flexDirection: 'row'}}>
                <MaterialCommunityIcons name="logout-variant" size={30} style={styles.logoutIcon}></MaterialCommunityIcons>
                <Text size={20} style={styles.logoutTxt}>Logout</Text>
              </View>

              <View style={{justifyContent:'flex-end', flex: 1, flexDirection: 'row'}}>
                <MaterialCommunityIcons name="logout-variant" size={30} style={styles.editIcon}></MaterialCommunityIcons>
                <Text size={20} style={styles.editTxt}>Edit</Text>
              </View>
            </Block>

            <Block flex={0.4} center>
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
                        color={'#ffffff'}
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
                        color={'#ffffff'}
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
                        color={'#ffffff'}
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
                      <MaterialIcons name="location-on" size={16} color="#ffffff" style={{marginRight: 10}} />
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
                        color={'#ffffff'}
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
                        color={'#ffffff'}
                        name="padlock-unlocked"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={{backgroundColor: '#333333'}}
                  />            
                </Block>

                <Block flex={0.1} middle style={{marginBottom: height * 0.1}}>
                  <Button color="primary" style={styles.loginButton} onPress={() => {this.register()}}>
                    <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                      Register
                    </Text>
                  </Button>
                </Block>
              </KeyboardAvoidingView>
            </Block>
          </ScrollView>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
    paddingBottom: 20
  },
  headerImage: {
    width: width,
    height: height,
    justifyContent:'flex-start',
    borderRadius: 4,
    position: 'absolute'
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
  inputIcons: {
    marginRight: 12,
  },
  logoutIcon:{
    color: 'red',
    fontWeight: '200',
  },
  action: {
    width:"90%",
    alignSelf: 'center',
    marginTop: 10
  },
  logoutTxt: {
    color: 'red',
    fontFamily: 'opensans',
    marginLeft: 5
  },
  editIcon: {
    color: 'white',
    fontWeight: '200',
    textAlign: 'left'
  },
  editTxt: {
    color: 'white',
    fontFamily: 'opensans',
    marginLeft: 5,
    textAlign: 'left'
  }
});

export default Profile;
