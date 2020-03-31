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
import ToggleSwitch from 'toggle-switch-react-native';
import Popup from '../components/Popup';
import AuthAPI from '../api/AuthAPI';
import VendorModel from '../models/VendorModel';
import VendorProfileAPI from '../api/VendorProfileAPI'
import VendorAPI from '../api/VendorAPI'

const { width, height } = Dimensions.get("screen");

class Profile extends React.Component {
  state = {
    address: "", 
    edit: false, 
    popUpDialog: false,
    name: "",
    email: "",
    mobile: ""
  }

  constructor(props){
    super(props);
    //console.log(this.props.navigation.state.params);
    this.logout = this.logout.bind(this);
    this.clickLogout = this.clickLogout.bind(this);
    this.authAPI = new AuthAPI();
    this.vendorProfileAPI = new VendorProfileAPI();
    this.vendorAPI = new VendorAPI();
    this.retrieveData = this.retrieveData.bind(this); 
    this.retrieveLocationData = this.retrieveData.bind(this);
    this.saveAddress = null
  }

  componentDidMount(){
    this.didFocus = this.props.navigation.addListener('willFocus', () => {
      this.setState({ loading: true }, () => {
        this.retrieveData();
      })
    })
  }

  componentWillUnmount(){
    this.didFocus.remove();
  }

  async retrieveData(){
    let vendorId = await this.authAPI.retrieveVendorId();
    
    this.vendorProfileAPI.getUserById(vendorId, (vendorProfile) => {
      this.setState({name: vendorProfile.name, email: vendorProfile.email, mobile: vendorProfile.mobile})
      let saveAddress = vendorProfile.address;

      console.log(saveAddress);

      this.vendorAPI.getVendorLocationById(saveAddress, (vendorLocation) => {
        console.log(vendorLocation);
        this.setState({address: vendorLocation.address});
    })
    })
  }

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

  async logout(bool){
    this.setState({popUpDialog: false})
    if(bool){
      await this.authAPI.clearToken();
      this.props.navigation.navigate('Account');
    }
  }

  clickLogout(event){
    this.setState({popUpDialog: true})
  }

  render() {
    const { navigation } = this.props;

    if(this.state.edit){
      var updateInfo = <Button style={styles.loginButton} onPress={() => {this.register()}}>
                          <Text bold size={16} color={argonTheme.COLORS.WHITE}>
                            Update Info
                          </Text>
                        </Button>
    }
    else{
      updateInfo = null
    }

    return (
      <Block flex center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >
        
        <Popup visible={this.state.popUpDialog} choice={this.logout} question={"Do you want to log out?"}/> 
        <Block style={{position: 'absolute', top: 0}}>
            <ImageBackground source={require("../assets/imgs/Schedule1.png")} resizeMode='contain' style={styles.headerImage}/>
              <View style={{width: width, alignContent: 'center', alignItems: 'center', top: 15}}>
                <Text color="#ffffff" size={40} style={{ marginLeft: 10, fontFamily: 'ITCKRIST'}}>
                  My Profile
                </Text>
              </View>
          </Block>

          <ScrollView style={{marginTop: 110}}>
            <Block flex={0.1} row style={styles.action} >
              <View style={{alignContent:'flex-start', flex:1, flexDirection: 'row'}} onTouchStart={(event) => {this.clickLogout(event)}}>
                <MaterialCommunityIcons name="logout-variant" size={30} style={styles.logoutIcon}></MaterialCommunityIcons>
                <Text size={20} style={styles.logoutTxt}>Logout</Text>
              </View>

              <View style={{justifyContent:'flex-end', flex: 1, flexDirection: 'row'}}>
                <ToggleSwitch
                  isOn={this.state.edit}
                  onColor={"#333333"}
                  offColor={"#999999"}
                  onToggle={(isOn) => {this.setState({edit: isOn})}}
                />
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
                    onChangeText={(name) => {this.setState({name})}}
                    value={this.state.name}
                    editable={this.state.edit}
                    iconContent={
                      <Icon
                        size={16}
                        color={'#ffffff'}
                        name="hat-3"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={this.state.edit ? {backgroundColor: '#333333'}: {backgroundColor: '#1f1f1f'}}
                  />
                </Block>
                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                  <Input
                    borderless 
                    placeholder="Email"
                    editable={this.state.edit}
                    onChangeText={(email) => {this.setState({email})}}
                    value={this.state.email}
                    iconContent={
                      <Icon
                        size={16}
                        color={'#ffffff'}
                        name="ic_mail_24px"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={this.state.edit ? {backgroundColor: '#333333'}: {backgroundColor: '#1f1f1f'}}
                  />
                </Block>

                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                  <Input
                    borderless 
                    placeholder="Phone number"
                    editable={this.state.edit}
                    onChangeText={(phone) => {this.setState({phone})}}
                    value={this.state.phone}
                    iconContent={
                      <MaterialIcons
                        size={16}
                        color={'#ffffff'}
                        name="phone"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={this.state.edit ? {backgroundColor: '#333333'}: {backgroundColor: '#1f1f1f'}}
                  />
                </Block>

                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                  <Input
                    borderless 
                    placeholder="Address"
                    editable={this.state.edit}
                    onChangeText={(address) => {this.setState({address})}}
                    value={this.state.address}
                    iconContent={
                      <MaterialIcons
                        size={16}
                        color={'#ffffff'}
                        name="location-on"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={this.state.edit ? {backgroundColor: '#333333'}: {backgroundColor: '#1f1f1f'}}
                  />
                </Block>

                <Block flex={0.1} middle style={{marginBottom: height * 0.1}}>
                  {updateInfo}
                  <Button style={styles.passwordBtn} onPress={() => {navigation.navigate("ChangePassword")}}>
                    <Text bold size={16} color={argonTheme.COLORS.WHITE}>
                      Change Password
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
    height: 90,
    justifyContent:'flex-start',
    borderRadius: 4,
    position: 'absolute',
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
  },
  passwordBtn: {
    backgroundColor: "grey",
    marginTop: 15
  },
  picker: {
    width: '100%',
    paddingBottom: 0,
    backgroundColor: 'transparent',
    paddingLeft: 0,
    transform: [{scaleX: 0.77}, {scaleY: 0.77}],
    position: 'absolute',
    color: "#cccccc"
  }
});

export default Profile;

/*<Block width={width * 0.9} style={{ marginBottom: 15 }}>
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
                        onValueChange={(address, index) => {this.setState({address})}}
                        selectedValue={this.state.address}
                        enabled={this.state.edit}
                        style={styles.picker}
                        itemStyle={this.state.edit ? {backgroundColor: '#333333'}: {backgroundColor: '#1f1f1f'}}
                      >
                        <Picker.Item label="Address" value="" />
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                      </Picker>
                    </View>
                  </View>
                </Block>*/