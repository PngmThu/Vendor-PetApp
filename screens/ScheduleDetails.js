import React from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground, View, } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import Popup from '../components/Popup';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from 'galio-framework';
const { width, height } = Dimensions.get('screen');

class ScheduleDetails extends React.Component {

  constructor(props){
    super(props);
    //console.log(this.props.navigation.state.params);
    this.cancleBooking = this.cancleBooking.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  state = {
    popUpDialog: false,
    question: null,
    clickedDate: null
  }

  handleCancel(){
    this.setState({popUpDialog: true, question: 'Hello'})
  }

  cancleBooking(bool){
    this.setState({popUpDialog: false});
  }
  render() {
    const { navigation } = this.props;
    return (
      <Block flex center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >
          <Popup visible={this.state.popUpDialog} choice={this.cancleBooking} question={this.state.question}/> 
          <Block flex={0.1} middle>
            <ImageBackground source={require("../assets/imgs/Schedule1.png")} resizeMode='contain' style={styles.headerImage}/>
            <MaterialIcons name='keyboard-backspace' size={40} style={styles.backBtn}
                                  onPress={() => navigation.navigate("Home")}/>
            <Text color="#ffffff" size={40} style={{ marginLeft: 15, fontFamily: 'ITCKRIST'}}>
              Schedule
            </Text>
          </Block>

          <Block flex={0.8} center style={styles.booking}>
            <ScrollView>
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
                      <Text style={styles.value}> Hair cutting</Text>
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.field}>Time: 
                      <Text style={styles.value}> 14:00 02/02/2020</Text>
                    </Text>
                  </View>
                
                  <View style={styles.row}>
                    <Text style={styles.field}>Price: 
                      <Text style={styles.value}> 12 SGD</Text>
                    </Text>
                  </View>
              </View>

              <Button color="warning" size={'small'} onPress={() => {this.handleCancel()}} style={styles.cancelBtn}>Cancel</Button>
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
    height: height,
    justifyContent:'flex-start',
    borderRadius: 4,
    position: 'absolute'
  },
  booking: {
    backgroundColor: "rgba(45, 45, 45, 0.8)",
    borderRadius: 15,
    width: "95%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headerTxt: {
    fontFamily: "opensans",
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: "400",
    color: 'white'
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
    marginTop: 50, 
    marginLeft: 20,
    alignSelf: 'flex-start',
    color: 'white'}
});

export default ScheduleDetails;
