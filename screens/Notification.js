import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Block, Text } from "galio-framework";
import { Icon } from "../components";
import Loader from '../components/Loader';
import NotificationAPI from '../api/NotificationAPI'
import AuthAPI from '../api/AuthAPI'
import PetAPI from '../api/PetAPI'
import CustomerAPI from '../api/CustomerAPI';
const { width, height } = Dimensions.get("screen");

class Notification extends React.Component {

  state = {
    notifications: [],
    loading: true,
    notiData: [],
    loadData: false
  }

  constructor(props) {
    super(props)
    this.state = { address: "", notifications: [] }
    this.authAPI = new AuthAPI();
    this.petAPI = new PetAPI();
    this.customerAPI = new CustomerAPI();
    this.notificationAPI = new NotificationAPI();
    this.lastTime = null;
    this.loadMoreData = this.loadMoreData.bind(this);
  }

  // the screen focused (if there was a transition, the transition completed)
  async componentDidMount() {
    this.didFocus = this.props.navigation.addListener('willFocus', () => {
      this.setState({ loading: true }, () => {
        this.retrieveData();
      })
    })
  }

  /**
   * retrieve all notification object within a time period for a particular vendor.
   * @param {string} vendorId - this is the customer id to be searched for to retrieve notification object in the database.
   * @param {string} fromTime - this is the time period to filter the notification objects retrieved.
  */
  async retrieveData() {
    let vendorId = await this.authAPI.retrieveVendorId();
    let now = new Date();
    this.notificationAPI.getNotificationByVendorFromTime(vendorId, now, (notifs) => {
      this.setState({ notiData: notifs })
      this.handleNotiData(notifs);
    })
  }

  /**
   * load more notification object within a time period for a particular vendor.
   * @param {string} vendorId - this is the customer id to be searched for to retrieve notification object in the database.
   * @param {string} fromTime - this is the time period to filter the notification objects retrieved.
  */
  async loadMoreData(){
    let vendorId = await this.authAPI.retrieveVendorId();
    this.notificationAPI.getNotificationByVendorFromTime(vendorId, this.lastTime, (notifs) => {
      if(notifs.length == 0 || !notifs){
        return
      }
      let prevNoti = this.state.notiData.slice();
      let jointData = prevNoti.concat(notifs);
      this.setState({ notiData:  jointData})
      this.handleNotiData(notifs);
    })
  }

  // navigate to ScheduleDetails if vendor click on particular notification
  scheduleDetail(index) {
    this.props.navigation.navigate("ScheduleDetails", { data: this.state.notiData[index].bookingId });
  }

  /**
   * Handle notification data.
   * @param {string} customerId - this is the customer id to be searched for to retrieve customer object in the database.
  */
  handleNotiData(notifs) {
    var result = [];
    var count = 0;
    for (var i = 0; i < notifs.length; i++) {
      let notif = notifs[i];
      this.customerAPI.getCustomerById(notif.customerId, (customer) => {

        if (customer == false) {
          return;
        }

        notif.time = new Date(notif.time);
        notif.createdAt = new Date(notif.createdAt);
        result.push(
          <TouchableOpacity style={styles.agenda} key={count + Math.random()}>
            <View style={styles.leftIcon}>
              <Icon
                size={30}
                color={'#ffffff'}
                name="ic_mail_24px"
                family="ArgonExtra"
                style={styles.inputIcons}
              />
            </View>

            <View style={{ width: "90%", justifyContent: 'center' }}>
              <Text style={styles.time}>{notif.createdAt.getHours() + "h" + notif.createdAt.getMinutes() + "'  "
                + notif.createdAt.getDate() + "/" + (notif.createdAt.getMonth() + 1) + "/" + notif.createdAt.getFullYear()}
              </Text>
              <Text style={styles.notiTxt}>
                Your booking with customer {customer.firstName} {customer.lastName} on {notif.time.getDate()} -
                  {notif.time.getMonth() + 1} - {notif.time.getFullYear()} is {notif.bookingStatus}
              </Text>
            </View>

          </TouchableOpacity>
        );

        count++;
        if (count == notifs.length) {
          let prev = this.state.notifications.slice();
          let jointData = prev.concat(result);
          this.setState({ notifications: jointData, loading: false });
          return;
        }

      })
    }

    this.lastTime = new Date(notifs[notifs.length - 1].createdAt) - 1000;
    console.log(this.lastTime);
  }

  /**
  * render Notification screen
  */
  render() {
    const { navigation } = this.props;

    if (this.state.loading) {
      var loader = <Loader />
    }

    return (
      <Block flex center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/galaxy_bg.jpg")}
          style={{ width, height, zIndex: 1 }}
        >

          {loader}

          <Block style={{ position: 'absolute', top: 0 }}>
            <ImageBackground source={require("../assets/imgs/Schedule1.png")} resizeMode='contain' style={styles.headerImage} />
            <View style={{ width: width, alignContent: 'center', alignItems: 'center', top: 15 }}>
              <Text color="#ffffff" size={40} style={{ marginLeft: 10, fontFamily: 'ITCKRIST' }}>
                Notification
                </Text>
            </View>
          </Block>

          <ScrollView 
            flex={1}
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                this.loadMoreData()
              }
            }}
            scrollEventThrottle={400}
            style={{ width: "100%", marginBottom: 100, marginTop: 100 }}>

            <Block center>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                enabled
              >
                <Block center style={{ width: width, paddingBottom: 50 }}>
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

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

const styles = StyleSheet.create({
  home: {
    width: width,
    paddingBottom: 20
  },
  headerImage: {
    width: width,
    height: 90,
    justifyContent: 'flex-start',
    borderRadius: 4,
    position: 'absolute',
  },
  inputIcons: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  agenda: {
    width: "90%",
    borderRadius: 15,
    backgroundColor: 'rgba(45, 45, 45, 0.6)',
    height: 100,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    flexDirection: 'row',
    marginBottom: 20
  },
  notiTxt: {
    fontWeight: '100',
    fontSize: 17,
    color: '#ffffff',
    alignContent: 'center',
    justifyContent: 'center',
    fontFamily: 'opensans',
    paddingLeft: 10
  },
  leftIcon: {
    backgroundColor: "#520099",
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 25,
    alignItems: 'center'
  },
  time: {
    fontFamily: 'opensans',
    fontSize: 14,
    color: '#cccccc',
    paddingLeft: 10
  }
});

export default Notification;
