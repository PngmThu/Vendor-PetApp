import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { argonTheme } from "../constants";
import { Button, Icon, Input } from "../components";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Notification from '../models/NotificationModel';
import ToggleSwitch from 'toggle-switch-react-native';
import Popup from '../components/Popup';
import AuthAPI from '../api/AuthAPI';
import VendorProfileAPI from '../api/VendorProfileAPI';
import VendorAPI from '../api/VendorAPI';

const { width, height } = Dimensions.get("screen");

class Profile extends React.Component {
  state = {
    address: "", 
    edit: false, 
    popUpDialog: false,
    name: "",
    email: "",
    store: "",
    question: "",
    popUpType: 0,
    keyboardHeight: 0
  }

  constructor(props){
    super(props);
    //console.log(this.props.navigation.state.params);
    this.logout = this.logout.bind(this);
    this.clickLogout = this.clickLogout.bind(this);
    this.authAPI = new AuthAPI();
    this.vendorProfileAPI = new VendorProfileAPI();
    this.vendorAPI = new VendorAPI();
    this.vendor = new Object();
    this.retrieveData = this.retrieveData.bind(this); 
    this.handleUpdateInfo = this.handleUpdateInfo.bind(this);
    this.clickUpdate = this.clickUpdate.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
  }

  // the screen focused (if there was a transition, the transition completed)
  // detect if user close the keyboard
  componentDidMount(){
    this.didFocus = this.props.navigation.addListener('willFocus', () => {
      this.retrieveData();
    });
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
  }

  // remove detecting if user close the keyboard
  // remove screen focused
  componentWillUnmount(){
    this.didFocus.remove();
    this.keyboardDidShowListener.remove();
  }

  // is fired after the keyboard appears
  _keyboardDidShow(e){
    this.setState({keyboardHeight: e.endCoordinates.height});
  }

  /**
   * retrieve data of vendor.
   * @param {string} vendorId - this is the id of the vendor to be retrieve.
   * @param {string} id - this is the id of vendorLocation.
   */
  async retrieveData(){
    let vendorId = await this.authAPI.retrieveVendorId();
    
    this.vendorProfileAPI.getUserById(vendorId, (vendorProfile) => {
      this.vendor = vendorProfile;
      this.setState({name: vendorProfile.name, email: vendorProfile.email});

      this.vendorAPI.getVendorLocationById(vendorId, (vendorLocation) => {
        this.setState({address: vendorLocation.address, store: vendorLocation.name});
      })
    })
  }

  /**
  * vendor logout and navigate to Account screen
  * clear token
  */
  async logout(){
    await this.authAPI.clearToken();
    this.props.navigation.navigate('Account');
  }

  /**
  * vendor click on logout button and display popup
  */
  clickLogout(){
    this.setState({popUpDialog: true, question: 'Do you want to logout?', popUpType: 1})
  }

  /**
  * vendor click on update button and display popup
  */
  clickUpdate(){
    this.setState({popUpDialog: true, question: 'Do you want to update profile?', popUpType: 2})
  }

  /**
  * Handle update user account.
  * display relevant Alert
  * @param {object} vendor - this is the vendor object to be updated.
  */
  handleUpdateInfo(){
    if(!this.validateInput()){
      return;
    }
    this.vendor.name = this.state.name;

    this.vendorProfileAPI.updateUserById(this.vendor, (res) => {
      Alert.alert('Successfully', "Your profile is updated successfully!",
      [{text: 'OK'}]);
      this.setState({edit: false})
    })
  }

  /**
  * validate empty input field for name and email address
  */
  validateInput(){
    if(!this.state.email || !this.state.name){
      Alert.alert('Error', "Input field can not be empty",
      [{text: 'OK'}])
      return false;
    }
    return true;
  }

  /**
  * Handle if vendor click on update or logout button
  */
  handleChoice(bool){
    this.setState({popUpDialog: false})
    if(bool){
      if(this.state.popUpType == 2){
        this.handleUpdateInfo();
      }
      else if(this.state.popUpType == 1){
        this.logout();
      }
    }
  }

  /**
  * render Profile screen
  */
  render() {
    const { navigation } = this.props;

    if(this.state.edit){
      var updateInfo = <Button style={styles.loginButton} onPress={this.clickUpdate}>
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
          source={require("../assets/imgs/galaxy_bg.jpg")}
          style={{ width, height, zIndex: 1 }}
        >
        
        <Popup visible={this.state.popUpDialog} choice={this.handleChoice} question={this.state.question}/> 
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
              <TouchableOpacity style={{alignContent:'flex-start', flex:1, flexDirection: 'row'}} onPress={this.clickLogout}>
                <MaterialCommunityIcons name="logout-variant" size={30} style={styles.logoutIcon}></MaterialCommunityIcons>
                <Text size={20} style={styles.logoutTxt}>Logout</Text>
              </TouchableOpacity>

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
                keyboardVerticalOffset={this.state.keyboardHeight}
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
                    editable={false}
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
                    style={{backgroundColor: '#1f1f1f'}}
                  />
                </Block>

                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                  <Input
                    borderless 
                    placeholder="Store name"
                    editable={false}
                    value={this.state.store}
                    iconContent={
                      <MaterialIcons
                        size={16}
                        color={'#ffffff'}
                        name="store"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={{backgroundColor: '#1f1f1f'}}
                  />
                </Block>

                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                  <Input
                    borderless 
                    placeholder="Address"
                    editable={false}
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
                    style={{backgroundColor: '#1f1f1f'}}
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