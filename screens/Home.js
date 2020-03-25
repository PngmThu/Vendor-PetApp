import React from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground, View, TouchableOpacity } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import Calendar from '../components/Calendar';
import Popup from '../components/Popup';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('screen');

class Home extends React.Component {

  constructor(props){
    super(props);
    this.calendarRef = React.createRef();
    this.toggleDateStatus = this.toggleDateStatus.bind(this);
    this.scheduleDetail = this.scheduleDetail.bind(this);
    this.dateStatusChoice = this.dateStatusChoice.bind(this);
    this.scheduleByMonth = this.scheduleByMonth.bind(this);
  }

  state = {
    popUpDialog: false,
    question: null,
    clickedDate: null,
    unavailableDate: [],
    bookedDate: []
  }

  componentDidMount(){
    this.scheduleByMonth('');
  }

  scheduleDetail(event){
    this.props.navigation.navigate("ScheduleDetails", {data: '123'});
  }

  toggleDateStatus(marked, date){

    setTimeout(() => {
      this.scrollview_ref.scrollTo({ x: 0, y: height*2, animated: true });
    }, 1)

    this.setState({clickedDate: date});
    if(!marked){
      this.setState({question: "Do you want to mark " + date + " as unavailable?"});
    }
    else{
      this.setState({question: "Do you want to unmark " + date + " ?"});
    }
    this.setState({popUpDialog: true});
  }

  dateStatusChoice(bool){

    if(bool){
      this.calendarRef.current.updateDate(this.state.clickedDate);
    }
    this.setState({popUpDialog: false});
  }

  scheduleByMonth(month){
    this.setState({unavailableDate: ['2020-03-01', '2020-03-02'], bookedDate: ['2020-03-03', '2020-03-05'],
                  }, () => {
                    this.calendarRef.current.processDate();
                  })
  }

  renderTimeSchedule(index){
    let table = [];
    for(var i = index; i < this.state.bookedDate.length; i++){
      table.push(
        <TouchableOpacity key={i} style={styles.leftDetail} onPress={() => {this.scheduleDetail(i)}}>
          <Text style={styles.time}>09:00</Text>
          <Text style={styles.service}>Hair cutting service</Text>
          <MaterialIcons name="cancel" size={22} style={{...styles.statusIcon, color: 'red'}}/>
        </TouchableOpacity>
      )
    }
    return table
  }

  renderDaySchedule(date){
    let table = [];
    let lastDate = "";
    let counter = 0;
    for(var i = 0; i < this.state.bookedDate.length; i++){
        if(this.state.bookedDate[i]){
          table.push(
            <View key={counter} style={styles.agenda}>
              <View style={styles.dayBackground}> 
                  <Text style={styles.day}>2</Text>
              </View>

              <View style={styles.month}>
                <Text style={styles.monthTxt}>Mar</Text>
              </View>

              {this.renderTimeSchedule(i)}
            </View>
          )
        }
        counter += 1;
    }
    return table
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block flex center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >
          <Popup visible={this.state.popUpDialog} choice={this.dateStatusChoice} question={this.state.question}/>
          <Block flex={0.1} middle>
            <ImageBackground source={require("../assets/imgs/Schedule1.png")} resizeMode='contain' style={styles.headerImage}/>
            <Text color="#ffffff" size={40} style={{ marginLeft: 15, fontFamily: 'ITCKRIST'}}>
              Schedule
            </Text>
          </Block>

          <Block flex={0.05} row center style={styles.annotation}>
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

          <Block flex={0.47} center style={styles.calendar}>
            <Calendar ref={this.calendarRef} unavailableDate={this.state.unavailableDate} 
                      bookedDate={this.state.bookedDate} markDate={this.state.clickedDate} toggleDateStatus={this.toggleDateStatus}/>
          </Block>

          <Block flex={0.33} center style={{width: width, paddingBottom: 50}}>
            <ScrollView scrollToOverflowEnabled={true} bounces={true} style={{width: "100%"}}   ref={ref => {this.scrollview_ref = ref;}}>
              {this.renderDaySchedule()}
            </ScrollView>
          </Block>
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

const styles = StyleSheet.create({
  home: {
    width: width,    
    marginTop: 0,
    paddingBottom: 40
  },
  headerImage: {
    width: width,
    height: height,
    justifyContent:'flex-start',
    borderRadius: 4,
    position: 'absolute'
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
    width: "80%",
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
    fontFamily: "opensans",
    fontSize: 18,
    fontWeight: "300",
    color: "white"
  },
  time: {
    fontFamily: "opensans",
    fontSize: 19,
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
    fontFamily: "opensans",
    fontSize: 30,
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
    marginLeft: 17,
    alignSelf: 'flex-start',
    marginTop: 60
  },
  monthTxt: {
    color: 'white',
    fontFamily: 'opensans',
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default Home;
