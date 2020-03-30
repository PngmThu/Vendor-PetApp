import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Picker,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  Alert,
  Image
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { argonTheme } from "../constants";
import { Button, Icon, Input } from "../components";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Notification from '../models/NotificationModel';
import ToggleSwitch from 'toggle-switch-react-native';
import Popup from '../components/Popup';
import ServiceAPI from '../api/ServiceAPI';
const { width, height } = Dimensions.get("screen");

class ServiceInput extends React.Component {
  state = {
    price: "", 
    edit: false, 
    popUpDialog: false,
    name: "",
    description: "",
    createNew: false,
    obj: null,
  }

  constructor(props){
    super(props);
    this.getPropData = this.getPropData.bind(this);
    this.clickSave = this.clickSave.bind(this);
    this.confirm = this.confirm.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.serviceAPI = new ServiceAPI();
  }

  componentDidMount(){
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.getPropData()
    })
  }

  componentWillUnmount () {
    this.focusListener.remove()
  }

  getPropData(){
    var params = this.props.navigation.state.params;
    if(params){
      this.setState({createNew: params.createNew})
      if(params.data){
        this.setState({price: params.data.price.toString(), name: params.data.name, 
          description: params.data.description, obj: params.data})
      }
      else{
        this.setState({price: "", name: "", description: "", obj: null})
      }
    }
    else{
      this.props.navigation.goBack();
    }
  }

  clickSave(){
    if(this.validateInput()){
      this.setState({popUpDialog: true})
    }
  }

  async confirm(bool){
    if(bool){
      if(this.state.createNew){
        let vendorId = await this.serviceAPI.authAPI.retrieveVendorId();

        let service = new Object({
          name: this.state.name,
          price: this.state.price,
          description: this.state.description,
          vendorId: vendorId
        })
        
        this.serviceAPI.createNewService(service, (res) => {
          if(res){
            Alert.alert('Successfully', "Service is created successfully!",
            [{text: 'Ok', onPress: () => {this.props.navigation.goBack()}}])
          }
          else{
            Alert.alert('Error', "Server error",
            [{text: 'Ok'}])
          }
        })
      }
      else{
        let service = this.state.obj;
        service.name = this.state.name;
        service.price = this.state.price;
        service.description = this.state.description;
        this.serviceAPI.updateService(service, (res) => {
          if(res){
            Alert.alert('Successfully', "Service is updated successfully!",
            [{text: 'Ok', onPress: () => {this.props.navigation.goBack()}}])
          }
          else{
            Alert.alert('Error', "Server error",
            [{text: 'Ok'}])
          }
        })
      }
    }
    this.setState({popUpDialog: false, edit: false})
  }

  validateInput(){
    if(isNaN(this.state.price) || this.state.price <= 0){
      Alert.alert('Error', "Invalid price input",
      [{text: 'Ok'}])
      return false;
    }

    if(this.state.name == ""){
      Alert.alert('Error', "Service name can not be empty",
      [{text: 'Ok'}])
      return false;
    }
    return true
  }

  render() {
    const { navigation } = this.props;
    if(this.state.createNew || this.state.edit){
      var actionBtn = <Button style={styles.loginButton} onPress={() => {this.clickSave()}}>
                          <Text bold size={16} color={argonTheme.COLORS.WHITE}>
                            Save 
                          </Text>
                        </Button>
    }

    if(!this.state.createNew){
      var toggleBtn = <Block flex={0.1} row style={styles.action} >
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
    }
    return (
      
      <SafeAreaView>
        <Block flex center style={styles.home}>
          <ImageBackground
            source={require("../assets/imgs/background2.gif")}
            style={{ width, height, zIndex: 1 }}
          >
          <Popup visible={this.state.popUpDialog} choice={this.confirm} 
            question={this.state.createNew ? "Are you sure to create this service?" : "Are you sure to update this service?"}/> 

          <Block style={{position: 'absolute', top: 0}}>
            <ImageBackground source={require("../assets/imgs/Schedule1.png")} resizeMode='contain' style={styles.headerImage}/>
              <View style={{width: width, alignContent: 'center', alignItems: 'center', top: 15}}>
                <MaterialIcons name='keyboard-backspace' size={40} style={styles.backBtn}
                                          onPress={() => navigation.navigate("Services")}/>
                <Text color="#ffffff" size={40} style={{ marginLeft: 10, fontFamily: 'ITCKRIST'}}>
                  Service Info
                </Text>
              </View>
          </Block>

            <ScrollView style={{top: 110}}>
              <Block flex={1} center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  keyboardVerticalOffset={300}
                  enabled
                >
                <Block flex middle>
                  <Image source={require("../assets/imgs/store.png")} resizeMode='contain' 
                          style={{width: 240, height: 160}}/>
                </Block>
                  {toggleBtn}
                  <Block width={width * 0.9} style={{marginTop: 20, marginBottom: 15 }}>
                    <Input
                      borderless
                      placeholder="Service name"
                      onChangeText={(name) => {this.setState({name})}}
                      value={this.state.name}
                      editable={this.state.edit || this.state.createNew}
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
                      placeholder="Service price"
                      editable={this.state.edit || this.state.createNew}
                      onChangeText={(price) => {this.setState({price})}}
                      value={this.state.price}
                      iconContent={
                        <MaterialCommunityIcons name="currency-usd" size={16} style={styles.inputIcons}></MaterialCommunityIcons>
                      }
                      style={this.state.edit ? {backgroundColor: '#333333'}: {backgroundColor: '#1f1f1f'}}
                    />
                    <Text style={styles.currency}>SGD</Text>
                  </Block>

                  <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                    <TextInput
                      placeholder="Description"
                      editable={this.state.edit || this.state.createNew}
                      onChangeText={(description) => {this.setState({description})}}
                      value={this.state.description}
                      numberOfLines={5}
                      style={this.state.edit ? {...styles.descriptionBox, backgroundColor: '#333333'} : {...styles.descriptionBox, backgroundColor: '#1f1f1f'}}
                    >
                      </TextInput>
                  </Block>

                  <Block flex={0.1} middle style={{marginBottom: height * 0.1}}>
                    {actionBtn}
                  </Block>
                </KeyboardAvoidingView>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
      </SafeAreaView>

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
    color: 'white'
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
  },
  descriptionBox: {
      color: 'white',
      textAlignVertical: 'top',
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 10
  },
  backBtn: {
    position: 'absolute',
    top: 10,
    marginLeft: 22,
    alignSelf: 'flex-start',
    color: 'white'
  },
  currency: {
    position: 'absolute',
    color: 'white',
    fontSize: 14,
    fontFamily: 'opensans',
    alignSelf: 'flex-end',
    right: 20,
    top: 20
  }
});

export default ServiceInput;
