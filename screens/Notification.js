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
import Loader from '../components/Loader';
import NotificationAPI from '../api/NotificationAPI'
import AuthAPI from '../api/AuthAPI'
import PetAPI from '../api/PetAPI'
import CustomerAPI from '../api/CustomerAPI'
const { width, height } = Dimensions.get("screen");

class Notification extends React.Component {

  state = {
    notifications: [],
    loading: true,
  }
  constructor(props){
    super(props)
    this.state = {address: "", notifications: []}
    this.authAPI = new AuthAPI();
    this.petAPI = new PetAPI();
    this.customerAPI = new CustomerAPI();
    this.notificationAPI = new NotificationAPI();
  }

async componentDidMount(){

  this.didFocus = this.props.navigation.addListener('willFocus', () => {
    this.setState({loading: true}, () => {
      this.retrieveData();
      })
    })
  }

  async retrieveData() {
    let vendorId = await this.authAPI.retrieveVendorId();
    this.notificationAPI.getNotificationByVendor(vendorId, (res) => {
      this.handleNotiData(res);
    })
  }

  handleNotiData(res){
    var result = [];
    var count = 0;

    res.forEach( notif => { 
       this.customerAPI.getCustomerById(notif.customerId, (customer)=>{
        
        if (customer == false) {
          return;
        }

        notif.time = new Date(notif.time);

        result.push(
          <View style={styles.agenda}>
            <View style={styles.leftDetail}>
              
              <View style={styles.leftIcon}>
                <Icon
                  size={30}
                  color={'#ffffff'}
                  name="ic_mail_24px"
                  family="ArgonExtra"
                  style={styles.inputIcons}
                />
              </View>

              <Text style={styles.notiTxt}>
                Your booking with customer {customer.firstName} {customer.lastName} on {notif.time.getDate() + 1} - 
                {notif.time.getMonth() + 1} - {notif.time.getFullYear()} is {notif. bookingStatus}       
              </Text>

            </View>
          </View>
        );

        count ++;
        if (count == res.length) {
          this.setState({notifications:result, loading: false})
        }
      })
    })
  }

  render() {
    const { navigation } = this.props;

    if(this.state.loading){
      var loader = <Loader />
    }

    return (
      <Block flex center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >
        
        {loader}

        <Block flex={0.2} middle >
          <ImageBackground source={require("../assets/imgs/Schedule1.png")} resizeMode='contain' style={styles.headerImage}/>
          <Text color="#ffffff" size={40} style={{ marginLeft: 15 }}>
            Notification
          </Text>
        </Block>

          <ScrollView flex={0.8} style={{width: "100%", marginBottom: 100 }}>

            <Block center>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                enabled
              >
              <Block center style={{width: width, paddingBottom: 50}}>
                    {this.state.notifications}
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
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  agenda: {
    width: "92%",
    alignItems: 'center',
    alignSelf: "center"
  },
  leftDetail: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    height: 80,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    marginBottom: 10,
    flexDirection: 'row'
  },
  notiTxt: {
    fontWeight:'100', 
    fontSize: 17.5, 
    color: '#ffffff', 
    alignContent: 'center',
    justifyContent: 'center'
  },
  leftIcon: { 
    flexDirection: 'row', 
    backgroundColor: "purple", 
    marginTop: 20, 
    marginLeft:40, 
    width: 50, 
    height: 50, 
    borderRadius: 25 
  }
});

export default Notification;
