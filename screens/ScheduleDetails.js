import React from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground, View, } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import Popup from '../components/Popup';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'galio-framework';
import BookingAPI from '../api/BookingAPI';
import ServiceAPI from '../api/ServiceAPI';
const { width, height } = Dimensions.get('screen');

class ScheduleDetails extends React.Component {

  constructor(props){
    super(props);
    this.cancleBooking = this.cancleBooking.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.bookingAPI = new BookingAPI();
    this.serviceAPI = new ServiceAPI();
    this.bookingTime = new Date();
    this.booking = new Object();
  }

  state = {
    popUpDialog: false,
    question: null,
    clickedDate: null,
    service: new Object(),
    bookingStatus: 'booked'
  }

  componentDidMount(){
    this.didFocus = this.props.navigation.addListener('willFocus', () => {
      this.retrieveData();
    })
  }

  componentWillUnmount(){
    this.didFocus.remove();
  }

  retrieveData(){
    this.booking = this.props.navigation.state.params.data;
    if(!this.booking){
      this.props.navigation.goBack();
    }
    this.bookingTime = new Date(this.booking.time);
    this.setState({bookingStatus: this.booking.status})
    this.serviceAPI.getServiceById(this.booking.serviceId, (res) => {
      this.setState({service: res})
    })
  }

  handleCancel(){
    this.setState({popUpDialog: true, question: 'Are you sure to cancel this booking'})
  }

  cancleBooking(bool){
    if(bool){
      this.booking.status = "cancelled";
      this.setState({bookingStatus: false})
      this.bookingAPI.updateBookingById(this.booking._id, this.booking, (res) => {
        console.log(res);
      })
    }
    this.setState({popUpDialog: false});
  }

  render() {
    const { navigation } = this.props;

    if(this.state.bookingStatus == 'booked'){
      var bookingCancel = <Button color="warning" size={'small'} onPress={() => {this.handleCancel()}} style={styles.cancelBtn}>Cancel</Button>
    }else{
      bookingCancel = 
      <View style={{width: "100%", alignContent: 'center'}}>
          <MaterialCommunityIcons name={iconStatus[this.state.bookingStatus]} 
            size={35} style={{textAlign: 'center', alignSelf: 'center'}} color={iconColor[this.state.bookingStatus]}/>
      </View>
    }
    return (
      <Block flex center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >
          <Popup visible={this.state.popUpDialog} choice={this.cancleBooking} question={this.state.question}/> 
          <Block style={{position: 'absolute', top: 0}}>
            <ImageBackground source={require("../assets/imgs/Schedule1.png")} resizeMode='contain' style={styles.headerImage}/>
              <View style={{width: width, alignContent: 'center', alignItems: 'center', top: 15}}>
                <MaterialIcons name='keyboard-backspace' size={40} style={styles.backBtn}
                                          onPress={() => navigation.navigate("Home")}/>
                <Text color="#ffffff" size={38} style={{ marginLeft: 15, fontFamily: 'ITCKRIST'}}>
                  Booking Details
                </Text>
              </View>
          </Block>

          <Block flex={1} center style={styles.booking}>
            <ScrollView style={{marginBottom: 15}}>
              <Text style={styles.headerTxt}>Customer info</Text>
              <View style={styles.detailInfo}>
                  <View style={styles.row}>
                    <Text style={styles.field}>Name: 
                      <Text style={styles.value}> My Customer</Text>
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.field}>Address: 
                      <Text style={styles.value}> Reacted native supports nested Text components, and you must use this to get your desired result</Text>
                    </Text>
                  </View>
                
                  <View style={styles.row}>
                    <Text style={styles.field}>Phone number: 
                      <Text style={styles.value}> 123456</Text>
                    </Text>
                  </View>
              </View>

              <Text style={styles.headerTxt}>Pet info</Text>
              <View style={styles.detailInfo}>
                  <View style={styles.row}>
                    <Text style={styles.field}>Name: 
                      <Text style={styles.value}> My Pet</Text>
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.field}>Type: 
                      <Text style={styles.value}> Pug</Text>
                    </Text>
                  </View>
                
                  <View style={styles.row}>
                    <Text style={styles.field}>Weight: 
                      <Text style={styles.value}> 5.3 kg</Text>
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.field}>Height: 
                      <Text style={styles.value}> 80 cm</Text>
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.field}>Age: 
                      <Text style={styles.value}> 3 years old</Text>
                    </Text>
                  </View>
              </View>

              <Text style={styles.headerTxt}>Booking info</Text>
              <View style={styles.detailInfo}>
                  <View style={styles.row}>
                    <Text style={styles.field}>Service: 
                      <Text style={styles.value}> {this.state.service.name}</Text>
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.field}>Time: 
                      <Text style={styles.value}> {this.bookingTime.getHours() + ":" + this.bookingTime.getMinutes() + " " +
                            (this.bookingTime.getDate() + 1) + "-" + (this.bookingTime.getMonth() + 1) + "-" + this.bookingTime.getFullYear()}</Text>
                    </Text>
                  </View>
                
                  <View style={styles.row}>
                    <Text style={styles.field}>Price: 
                      <Text style={styles.value}> {this.state.service.price} SGD</Text>
                    </Text>
                  </View>
              </View>

              {bookingCancel}
            </ScrollView>
          </Block>

        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
    marginTop: 0,
    paddingBottom: 20
  },
  headerImage: {
    width: width,
    height: 90,
    justifyContent:'flex-start',
    borderRadius: 4,
    position: 'absolute',
  },
  booking: {
    backgroundColor: "rgba(45, 45, 45, 0.85)",
    borderRadius: 15,
    width: "95%",
    paddingHorizontal: 20,
    marginTop: 100,
    marginBottom: 120,
  },
  headerTxt: {
    fontFamily: "opensans",
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: "400",
    color: 'white',
  },
  row:{
    textAlign: "left",
    width: "100%",
    marginTop: 10,
  },
  detailInfo: {
    width: "100%",
  },
  field:{
    fontWeight: '500',
    fontFamily: 'opensans',
    fontSize: 17,
    color: 'white'
  },
  value: {
    fontFamily: 'opensans',
    fontWeight: '300',
    marginLeft: 20,
  },
  cancelBtn: {
    alignSelf: 'center', 
    width: 100,
    marginTop: 5
  },
  backBtn: {
    position: 'absolute',
    top: 10,
    marginLeft: 22,
    alignSelf: 'flex-start',
    color: 'white'
  }
});

const iconStatus = {
  'cancelled': 'cancel',
  'booked': 'chevron-double-right',
  'completed': 'check-circle'
}
const iconColor = {
  'cancelled': 'red',
  'booked': 'orange',
  'completed': 'green'
}
export default ScheduleDetails;
