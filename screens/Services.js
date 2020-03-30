import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Notification from '../models/NotificationModel';
import Popup from '../components/Popup';
const { width, height } = Dimensions.get("screen");

class Services extends React.Component {
  state = {
    popUpDialog: false,
    services: [{
            name: "Grooming",
            price: 12,
            description: "jnjsfdv"
        },
        {
            name: "Grooming",
            price: 12,
            description: "jnjsfdv"
        },
        {
            name: "Grooming",
            price: 12,
            description: "jnjsfdv"
        },
        {
            name: "Grooming",
            price: 12,
            description: "jnjsfdv"
        },
        {
            name: "Grooming",
            price: 12,
            description: "jnjsfdv"
        },
        {
            name: "Grooming",
            price: 12,
            description: "jnjsfdv"
        },
        {
            name: "Grooming",
            price: 12,
            description: "jnjsfdv"
        }
    ]
  }

  constructor(props){
    super(props);
    //console.log(this.props.navigation.state.params);
    this.logout = this.logout.bind(this);
    this.clickLogout = this.clickLogout.bind(this);
    this.renderCard = this.renderCard.bind(this);
    this.updateService = this.updateService.bind(this);
    this.createService = this.createService.bind(this);
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

  logout(bool){
    if(bool){
      console.log("Logged out!");
    }
    this.setState({popUpDialog: false})
  }

  clickLogout(event){
    this.setState({popUpDialog: true})
  }

  updateService(item){
    this.props.navigation.navigate('ServiceInput', {createNew: false, data: item});
  }

  createService(){
    this.props.navigation.navigate('ServiceInput', {createNew: true, data: null})
  }

  renderCard(){
    var table = [];
    this.state.services.forEach((item, index) => {
        if(index % 2 == 0 && index + 1 < this.state.services.length){
            table.push(
                <Block key={index} style={styles.container}>
                    <TouchableOpacity style={{...styles.cardService, marginRight: 10}} onPress={() => {this.updateService(item)}}>
                        <MaterialIcons name='pets' size={40} style={styles.petIcon}/>
                        <Text style={styles.priceTxt}>Price: {item.price} SGD</Text>
                        <View style={styles.cardFooter}>
                            <Text style={styles.itemTxt}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{...styles.cardService}}  onPress={() => {this.updateService(item)}}>
                        <MaterialIcons name='pets' size={40} style={styles.petIcon}/>
                        <Text style={styles.priceTxt}>Price: {item.price} SGD</Text>
                        <View style={styles.cardFooter}>
                            <Text style={styles.itemTxt}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                </Block>
            )
        }
        else if(index % 2 == 0){
            table.push(
                <Block key={index} style={styles.container}>
                    <TouchableOpacity style={{...styles.cardService}} onPress={() => {this.updateService(item)}}>
                        <MaterialIcons name='pets' size={40} style={styles.petIcon}/>
                        <Text style={styles.priceTxt}>Price: {item.price} SGD</Text>
                        <View style={styles.cardFooter}>
                            <Text style={styles.itemTxt}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                </Block>
            )
        }
    })
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
        
            <Popup visible={this.state.popUpDialog} choice={this.logout} question={"Do you want to log out?"}/> 
            <Block flex={0.12} middle >
              <ImageBackground source={require("../assets/imgs/Schedule1.png")} resizeMode='contain' style={styles.headerImage}/>
              <Text color="#ffffff" size={40} style={{ marginLeft: 15, fontFamily: 'ITCKRIST'}}>
                  Services
              </Text>
            </Block>

          <ScrollView style={{flex: 0.88, marginBottom: 60, marginTop: 20 }}>
              <Block center>
                {this.renderCard()}
              </Block>
          </ScrollView>
          
          <TouchableOpacity style={styles.addBtn} onPress={this.createService}>
            <MaterialCommunityIcons name="plus" size={50} style={styles.addIcon}></MaterialCommunityIcons>
          </TouchableOpacity>
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
  container:{
      width: "90%",
      flexDirection: "row",
      justifyContent: 'space-between',
      marginBottom: 30,
  },
  cardService: {
      backgroundColor: 'rgba(100, 100, 100, 0.5)',
      alignItems: "center",
      height: 160,
      alignSelf: "center",
      borderRadius: 10,
      padding: 0,
      flex: 0.5
  },
  petIcon:{
    marginTop: 30,
    color: '#885DDA'
  },
  cardFooter:{
      justifyContent: 'center',
      marginTop: 15,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      backgroundColor: 'rgba(30, 30, 30, 0.8)',
      width: "100%",
      height: 38
  },
  priceTxt: {
      marginTop: 15,
      fontFamily: "opensans",
      fontSize: 16,
      color: '#fafafa'
  },
  itemTxt: {
      fontFamily: 'opensans',
      color: '#fafafa',
      fontSize: 18,
      textAlign: 'center',
      fontWeight: '500'
  },
  addBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 2,
    backgroundColor: "#FF9B70",
    position: 'absolute',
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    right: 30,
    bottom: 100
  },
  addIcon: {
      color: "white",
      fontWeight: "600",
  }
});

export default Services;
