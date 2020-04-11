import React from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground, View, TouchableOpacity, Alert } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import Calendar from '../components/Calendar';
import Popup from '../components/Popup';
import Loader from '../components/Loader';
import AuthAPI from '../api/AuthAPI';
import ScheduleAPI from '../api/ScheduleAPI';
import BookingAPI from '../api/BookingAPI';
import VendorModel from '../models/VendorModel';
import ServiceAPI from '../api/ServiceAPI';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');

class Home extends React.Component {

  constructor(props){
    super(props);
    this.authAPI = new AuthAPI();
    this.scheduleAPI = new ScheduleAPI();
    this.bookingAPI = new BookingAPI();
    this.serviceAPI = new ServiceAPI();
    this.calendarRef = React.createRef();
    this.toggleDateStatus = this.toggleDateStatus.bind(this);
    this.scheduleDetail = this.scheduleDetail.bind(this);
    this.dateStatusChoice = this.dateStatusChoice.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.queryCurrentMonth = this.queryCurrentMonth.bind(this);
    this.scrollPos = [];
    this.lastFromTime = null;
    this.lastToTime = null;
  }

  state = {
    popUpDialog: false,
    question: null,
    clickedDate: null,
    unavailableDate: [],
    bookedDate: [],
    bookingData: [],
    servicesData: [],
    unavailableData: [],
    loading: true,
    scrollDate: [],
  }

  componentDidMount(){
    this.didFocus = this.props.navigation.addListener('willFocus', () => {
      if(!this.lastFromTime ){
        this.queryCurrentMonth();
      }
      else{
        this.retrieveData(this.lastFromTime, this.lastToTime);
      }
    })
  }

  componentWillUnmount(){
    this.didFocus.remove();
  }

  queryCurrentMonth(){
    let current = new Date();
    let currentYear = current.getFullYear();
    let currentMonth = current.getMonth();
    let fromTime = new Date(currentYear, currentMonth);

    if(currentMonth == 11){
      let toTime = new Date(currentYear + 1, 0)
    }
    else{
      toTime = new Date(currentYear, currentMonth + 1);
    }

    this.retrieveData(fromTime, toTime);
  }

  scheduleDetail(index){
    this.props.navigation.navigate("ScheduleDetails", {data: this.state.bookingData[index]._id});
  }

  toggleDateStatus(marked, date){

    this.setState({clickedDate: date});
    if(!marked){
      this.setState({question: "Do you want to mark " + date + " as unavailable?"});
    }
    else{
      this.setState({question: "Do you want to unmark " + date + " ?"});
    }
    this.setState({popUpDialog: true});
  }

  async dateStatusChoice(bool){

    if(bool){
      let date = new Date(this.state.clickedDate);

      let vendorId = await this.authAPI.retrieveVendorId();

      if(!this.state.unavailableDate.includes(this.state.clickedDate)){

        this.scheduleAPI.createUnavailableDate({date: date, vendorId: vendorId}, (res) => {
          if(res == true){
            Alert.alert('Successfully', "Date is updated successfully!",
            [{text: 'OK'}])
          }
          this.queryCurrentMonth();
        })

      }
      else{
        let schedule = this.state.unavailableData.find(v => {return this.parseDate(new Date(v.date)) == this.state.clickedDate});

        this.scheduleAPI.deleteUnavailableDate(schedule._id, (res) => {
          if(res == true){
            Alert.alert('Successfully', "Date is updated successfully!",
            [{text: 'OK'}])
          }
        })

      }
      this.calendarRef.current.updateDate(this.state.clickedDate);
    }

    this.setState({popUpDialog: false});
  }

  async retrieveData(fromTime, toTime){
    this.lastFromTime = fromTime;
    this.lastToTime = toTime;
    this.setState({loading: true});

    let vendorId = await this.authAPI.retrieveVendorId();
    let vendor = new VendorModel({_id: vendorId});
    
    this.serviceAPI.getServiceByVendor(vendorId, (services) => {
      this.setState({servicesData: services});

      this.scheduleAPI.getUnavailableDateByVendor(vendor, (unavailable) => {
        let unavailableDate = []
  
        unavailable.forEach(v => {
          let time = new Date(v.date)
          unavailableDate.push(this.parseDate(time))
        });
  
        this.bookingAPI.getBookingByVendorFromTo(vendorId, fromTime, toTime, (bookings) => {
          let bookedDate = [];
          let scrollDate = [];
          bookings.forEach(v => {
            let time = new Date(v.time);
            v.time = time;
            let parsedDate = this.parseDate(time);            
            if(!bookedDate.includes(parsedDate) && v.status != 'cancelled'){
              bookedDate.push(parsedDate);
            }

            if(!scrollDate.includes(parsedDate)){
              scrollDate.push(parsedDate)
            }

          }) 
  
          //bookings.sort((a, b) => { return a.time - b.time});
          this.setState({
            unavailableDate: unavailableDate, 
            bookedDate: bookedDate, 
            bookingData: bookings, 
            unavailableData: unavailable, 
            scrollDate: scrollDate
          }, () => {
            this.calendarRef.current.processDate();
            this.setState({loading: false})
          })   
        })
      })
    })
  }

  parseDate(time){
    let month = time.getMonth() < 9 ? "0" + (time.getMonth() + 1) : (time.getMonth() + 1);
    let date = time.getDate() < 9 ? "0" + time.getDate() : time.getDate();
    let parsedDate = time.getFullYear() + "-" + month + "-" + date;
    return parsedDate;
  }

  renderTimeSchedule(index){
    let table = [];
    let lastDate = this.state.bookingData[index].time;
    for(var i = index; i < this.state.bookingData.length; i++){
      let time = this.state.bookingData[i].time;
      
      if(!this.compareDate(lastDate, time)){
        break;
      }

      var service = this.state.servicesData.find( v => { 
        return v._id == this.state.bookingData[i].serviceId
      })

      table.push(
        <TouchableOpacity key={i} style={styles.leftDetail} onPress={this.scheduleDetail.bind(this, i)}>
          <Text style={styles.time}>{time.getHours()}:{time.getMinutes()}</Text>
          <Text style={styles.service}>
            {service ? service.name: null}
            </Text>
          <MaterialCommunityIcons name={iconStatus[this.state.bookingData[i].status]} 
            size={22} style={{...styles.statusIcon}} color={iconColor[this.state.bookingData[i].status]}/>
        </TouchableOpacity>
      )
    }

    return table
  }

  renderDaySchedule(month){
    let table = [];
    let lastDate = new Date('0000-01-01');
    let counter = 0;

    for(var i = 0; i < this.state.bookingData.length; i++){

      if(!this.compareDate(lastDate, this.state.bookingData[i].time)){
        lastDate = this.state.bookingData[i].time;
        table.push(
          <View key={counter} style={styles.agenda}
            onLayout={event => {
              const layout = event.nativeEvent.layout;
              this.scrollPos.push(layout.y);
            }}
          >
            <View style={styles.dayBackground}> 
              <Text style={styles.day}>{lastDate.getDate()}</Text>
            </View>

            <View style={styles.month}>
              <Text style={styles.monthTxt}>{monthName[lastDate.getMonth()]}</Text>
            </View>

            {this.renderTimeSchedule(i)}
          </View>
        )
        
        counter += 1;
      }
    }

    return table
  }

  compareDate(date1, date2){
    if(date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate() && date1.getFullYear() == date2.getFullYear()){
      return true;
    }

    return false;
  }

  scrollTo(day){
    let counter = 0;

    for(var i = 0; i < this.state.scrollDate.length; i++){
      if(day == this.state.scrollDate[i]){
        break;
      }
      counter += 1;
    }
    
    if(counter > this.state.scrollDate.length){
      return;
    }
    this.scrollview_ref.scrollTo({ x: 0, y: this.scrollPos[counter], animated: true })
  }

  render() {
    const { navigation } = this.props;

    if(this.state.loading){
      var loader = <Loader />
    }

    return (
      <Block flex center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/galaxy_bg.jpg")}
          style={{ width, height, zIndex: 1 }}
        >
          {loader}
          <Popup visible={this.state.popUpDialog} choice={this.dateStatusChoice} question={this.state.question}/>
          <Block style={{position: 'absolute', top: 0}}>
            <ImageBackground source={require("../assets/imgs/Schedule1.png")} resizeMode='contain' style={styles.headerImage}/>
              <View style={{width: width, alignContent: 'center', alignItems: 'center', top: 15}}>
                <Text color="#ffffff" size={40} style={{ marginLeft: 10, fontFamily: 'ITCKRIST'}}>
                  Schedule
                </Text>
              </View>
          </Block>

          <View style={{marginTop: 90, flex: 1}}>
            <Block flex={0.02} row center style={styles.annotation}>
              <View style={{...styles.circle, backgroundColor: 'red'}}/>
              <Text color="#ffffff" size={12} style={{ marginLeft: 5, marginRight: 10, fontFamily: 'opensans'}}>
                Unavailable
              </Text>
              <View style={{...styles.circle, backgroundColor: '#ffecd9'}}/>
              <Text color="#ffffff" size={12} style={{ marginLeft: 5, marginRight: 10, fontFamily: 'opensans'}}>
                Booked
              </Text>
              <View style={{...styles.circle, backgroundColor: '#bd4902'}}/>
              <Text color="#ffffff" size={12} style={{ marginLeft: 5, marginRight: 10, fontFamily: 'opensans'}}>
                Today
              </Text>
            </Block>

            <Block flex={0.57} center style={styles.calendar}>
              <Calendar ref={this.calendarRef} unavailableDate={this.state.unavailableDate} scrollTo={this.scrollTo} monthChange={this.retrieveData}
                        bookedDate={this.state.bookedDate} markDate={this.state.clickedDate} toggleDateStatus={this.toggleDateStatus}/>
            </Block>

            <Block flex={0.46} center style={{width: width, paddingBottom: 50}}>
              <ScrollView scrollToOverflowEnabled={true} bounces={true} style={{width: "100%", marginBottom: 50}}  
                      ref={ref => {this.scrollview_ref = ref;}}>
                {this.renderDaySchedule()}
              </ScrollView>
            </Block>
          </View>
        </ImageBackground>
      </Block>
    );
  }
}

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
const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const styles = StyleSheet.create({
  home: {
    width: width,    
    marginTop: 0,
    paddingBottom: 40
  },
  headerImage: {
    width: width,
    height: 90,
    justifyContent:'flex-start',
    borderRadius: 4,
    position: 'absolute',
  },
  calendar: {
    width: "95%",
    height: "95%",
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
    paddingTop: 20,
    marginBottom:0,
    elevation: 5,
    zIndex: 10
  },
  agenda: {
    width: "92%",
    alignItems: 'center',
    alignSelf: "center"
  },
  leftDetail: {
    width: "80%",
    borderRadius: 12,
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(45, 45, 45, 0.6)',
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    marginBottom: 10
  },
  service: {
    fontFamily: "opensans",
    fontSize: 16,
    fontWeight: "300",
    color: "white"
  },
  time: {
    fontFamily: "opensans",
    fontSize: 17,
    fontWeight: "600",
    color: "white"
  },
  dayBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    elevation: 2,
    backgroundColor: "#FF9B70",
    alignSelf: "flex-start",
    position: 'absolute',
    justifyContent: 'center',
    marginLeft: 15,
    marginTop: 5
  },
  day: {
    fontFamily: "opensans",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "white"
  },
  statusIcon:{
    fontWeight: "bold",
    position: "absolute",
    alignSelf: 'flex-end',
    right: 20,
    justifyContent: 'center'
  },
  month:{
    position: 'absolute',
    width: 70,
    alignContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 45
  },
  monthTxt: {
    color: 'white',
    fontFamily: 'opensans',
    fontWeight: '600',
    fontSize: 17,
    textAlign: 'center'
  }
});

export default Home;
