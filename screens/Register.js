import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Picker,
  View,
  Text,
  Alert,
  Keyboard
} from "react-native";
import { Block, Checkbox, theme } from "galio-framework";
import {
  Button,
  Icon,
  Input, Select
} from "../components";
import { Images, argonTheme } from "../constants";
import VendorAPI from '../api/VendorAPI';
import { MaterialIcons } from '@expo/vector-icons';
import Loader from '../components/Loader';
const { width, height } = Dimensions.get("screen");

const headerImg = require("../assets/imgs/headerLogin.png");

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
    this.renderPicker = this.renderPicker.bind(this);
    this.renderPickerItem = this.renderPickerItem.bind(this);
    this.vendorAPI = new VendorAPI();
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
  }

  componentDidMount() {
    this.didFocus = this.props.navigation.addListener('willFocus', () => {
      this.setState({ loading: true }, () => {
        this.retrieveData();
      })
    });

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
  }

  componentWillUnmount () {
    this.didFocus.remove();
    this.keyboardDidShowListener.remove();
  }

  state = {
    address: "",
    name: "",
    email: "",
    password: "",
    rePassword: "",
    vendorLocations: [],
    location: "",
    loading: true,
    keyboardHeight: 0
  }

  _keyboardDidShow(e){
    this.setState({keyboardHeight: e.endCoordinates.height});
  }

  retrieveData() {
    this.vendorAPI.getVendorLocation(res => {
      this.setState({ vendorLocations: res, loading: false })
    })
  }

  handleRegister() {
    if (!this.state.email || !this.state.name || !this.state.address || !this.state.password) {
      Alert.alert('Error', "Input field can not be empty",
        [{ text: 'Ok' }])
      return;
    }
    else if (this.state.password != this.state.rePassword) {
      Alert.alert('Error', "Password field not match",
        [{ text: 'Ok' }]);
      return;
    }
    this.vendor = new Object({
      email: this.state.email,
      mobile: this.state.phone,
      name: this.state.name,
      address: this.state.address,
      password: this.state.password
    });

    this.vendorAPI.createVendor(this.vendor, (res) => {
      if (res == true) {
        Alert.alert('Succesfully', 'User is created successfully! You can log in now',
          [{ text: 'Ok', onPress: () => this.props.navigation.navigate('Login') }]
        );
      }
      else {
        Alert.alert('Error', res,
          [{ text: 'Ok' }]);
      }
    })
  }

  renderPickerItem() {
    let table = []
    for (var i = 0; i < this.state.vendorLocations.length; i++) {
      table.push(
        <Picker.Item key={i} label={this.state.vendorLocations[i].name} value={this.state.vendorLocations[i]._id} />
      )
    }
    return table;
  }

  renderPicker() {
    return (
      <Picker
        selectedValue={this.state.address}
        style={{
          width: '100%',
          paddingBottom: 0,
          backgroundColor: 'transparent',
          paddingLeft: 0,
          transform: [{ scaleX: 0.77 }, { scaleY: 0.77 }],
          position: 'absolute',
          color: "#cccccc"
        }}
        itemStyle={{
          backgroundColor: "#000000"
        }}
        onValueChange={(itemValue, itemIndex) => {
          var item = this.state.vendorLocations.find(v => { return v._id == itemValue });
          this.setState({ address: itemValue, location: item ? item.address : "" });
        }

        }>
        <Picker.Item label="Store" value="" />
        {this.renderPickerItem()}
      </Picker>
    )

  }

  render() {
    const { navigation } = this.props;
    if (this.state.loading) {
      var loader = <Loader />
    }
    return (
      <Block flex middle >

        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >
          {loader}
          <Block flex={0.3} middle>
            <ImageBackground source={require("../assets/imgs/headerRegister.png")} resizeMode='contain' style={styles.headerImage}>
              <Block flex middle>
                <MaterialIcons name='keyboard-backspace' size={40} style={{ left: -170, top: -35, color: 'white' }}
                  onPress={() => navigation.navigate('Login')} />
              </Block>
            </ImageBackground>
          </Block>

          <Block flex={0.7}>
            <Block flex={0.1}>
              <Text style={{ marginLeft: 15, fontSize: 32, fontWeight: 'bold', color: 'white' }}>
                Create an account
              </Text>
            </Block>

            <ScrollView style={{flex: 0.9}}>
              <Block center>
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={this.state.keyboardHeight}>
                  <Block width={width * 0.9} style={{ marginTop: 30, marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Your name"
                      onChangeText={(name) => { this.setState({ name }) }}
                      value={this.state.name}
                      iconContent={
                        <Icon
                          size={16}
                          color={'white'}
                          name="hat-3"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      style={{ backgroundColor: '#333333' }}
                    />
                  </Block>
                  <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Email"
                      onChangeText={(email) => { this.setState({ email }) }}
                      value={this.state.email}
                      iconContent={
                        <Icon
                          size={16}
                          color={'white'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      style={{ backgroundColor: '#333333' }}
                    />
                  </Block>

                  <Block width={width * 0.9} style={{ marginBottom: 10 }}>
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
                        <MaterialIcons name="location-on" size={16} color="white" style={{ marginRight: 10 }} />
                        {this.renderPicker()}
                      </View>
                    </View>
                    <Text style={{ fontSize: 12, color: 'white', marginTop: 5, marginLeft: 20 }}>{"Location: " + this.state.location}</Text>
                  </Block>

                  <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                    <Input
                      password
                      viewPass
                      borderless
                      placeholder="Password"
                      onChangeText={(password) => { this.setState({ password }) }}
                      value={this.state.password}
                      iconContent={
                        <Icon
                          size={16}
                          color={'white'}
                          name="padlock-unlocked"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      style={{ backgroundColor: '#333333' }}
                    />
                  </Block>
                  <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                    <Input
                      password
                      viewPass
                      borderless
                      placeholder="Re-enter password"
                      onChangeText={(rePassword) => { this.setState({ rePassword }) }}
                      value={this.state.rePassword}
                      iconContent={
                        <Icon
                          size={16}
                          color={'white'}
                          name="padlock-unlocked"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                      style={{ backgroundColor: '#333333' }}
                    />
                  </Block>

                  <Block middle style={{ marginBottom: 20 }}>
                    <Button color="primary" style={styles.loginButton} onPress={this.handleRegister}>
                      <Text bold size={14} color={'white'} style={{ color: 'white' }}>
                        Register
                        </Text>
                    </Button>
                  </Block>
                </KeyboardAvoidingView>
              </Block>
            </ScrollView>
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
    justifyContent: 'flex-start',
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
