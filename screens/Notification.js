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

const { width, height } = Dimensions.get("screen");

class Notification extends React.Component {
  state = {address: ""}

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
          <Text color="#ffffff" size={40} style={{ marginLeft: 15 }}>
            Notification
          </Text>
        </Block>

          <ScrollView>

            <Block flex={0.4} center>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                enabled
              >
              <Block flex={0.33} center style={{width: width, paddingBottom: 50}}>
                <ScrollView style={{width: "100%" }}>
                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{flexDirection: 'row' }}>
                        <Icon style={{alignSelf: 'flex-start'}}
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                        <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', alignSelf: 'center'}}>
                          Booking of Tom Holland is confirmed on 20/03/2020
                          </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{flexDirection: 'row' }}>
                        <Icon style={{alignSelf: 'flex-start'}}
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                        <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', alignSelf: 'center'}}>
                        Booking of Tom Holland is confirmed on 20/03/2020
                          </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{flexDirection: 'row' }}>
                        <Icon style={{alignSelf: 'flex-start'}}
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                        <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', alignSelf: 'center'}}>
                        Booking of Tom Holland is confirmed on 20/03/2020
                          </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{flexDirection: 'row' }}>
                        <Icon style={{alignSelf: 'flex-start'}}
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                        <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', alignSelf: 'center'}}>
                        Booking of Tom Holland is confirmed on 20/03/2020
                          </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{flexDirection: 'row' }}>
                        <Icon style={{alignSelf: 'flex-start'}}
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                        <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', alignSelf: 'center'}}>
                        Booking of Tom Holland is confirmed on 20/03/2020
                          </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.agenda}>
                    <View style={styles.leftDetail}>
                      <View style={{flexDirection: 'row' }}>
                        <Icon style={{alignSelf: 'flex-start'}}
                          size={30}
                          color={'#ffffff'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                        <Text style={{fontWeight:'100', fontSize: 20, color: '#ffffff', alignSelf: 'center'}}>
                        Booking of Tom Holland is confirmed on 20/03/2020
                          </Text>
                      </View>
                    </View>
                  </View>

                </ScrollView>
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
    marginLeft: 5
  },
  editIcon: {
    color: 'white',
    fontWeight: '200',
    textAlign: 'left'
  },
  editTxt: {
    color: 'white',
    marginLeft: 5,
    textAlign: 'left'
  },
  profileButton: {
    width: width * 0.4,
    marginTop: 25,
    borderRadius: 10,
  },
  calendar: {
    width: "95%",
    height: "100%",
    borderRadius: 15,
    elevation: 2,
    justifyContent: 'center'
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    elevation: 2
  },
  annotation: {
    marginTop: 10,
    marginBottom:0
  },
  agenda: {
    width: "92%",
    alignItems: 'center',
    alignSelf: "center"
  },
  leftDetail: {
    width: "100%",
    borderRadius: 12,
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    height: 80,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    marginBottom: 10
  },
  service: {
    paddingRight: 100,
    fontSize: 16,
    fontWeight: "300",
    color: "white"
  },
  time: {
    paddingRight: 100,
    fontSize: 17,
    fontWeight: "600",
    color: "white"
  },
  dayBackground: {
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 2,
    backgroundColor: "#FF9B70",
    alignSelf: "flex-start",
    position: 'absolute',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 5
  },
  day: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    color: "white"
  }
});

export default Notification;
