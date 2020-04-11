import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  View,
  ScrollView,
  Image
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Popup from '../components/Popup';
import ServiceAPI from '../api/ServiceAPI';
const { width, height } = Dimensions.get("screen");

class Services extends React.Component {
  state = {
    popUpDialog: false,
    services: []
  }

  constructor(props) {
    super(props);
    //console.log(this.props.navigation.state.params);
    this.logout = this.logout.bind(this);
    this.clickLogout = this.clickLogout.bind(this);
    this.renderCard = this.renderCard.bind(this);
    this.updateService = this.updateService.bind(this);
    this.createService = this.createService.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
    this.serviceAPI = new ServiceAPI();
  }

  componentDidMount() {
    this.didFocus = this.props.navigation.addListener('willFocus', () => {
      this.setState({ loading: true }, () => {
        this.retrieveData();
      })
    })
  }

  componentWillUnmount(){
    this.didFocus.remove();
  }
  async retrieveData() {
    let vendorId = await this.serviceAPI.authAPI.retrieveVendorId();
    this.serviceAPI.getServiceByVendor(vendorId, (res) => {
      this.setState({ services: res })
    })
  }

  register() {
  }

  logout(bool) {
    if (bool) {
      console.log("Logged out!");
    }
    this.setState({ popUpDialog: false })
  }

  clickLogout(event) {
    this.setState({ popUpDialog: true })
  }

  updateService(item) {
    this.props.navigation.navigate('ServiceInput', { createNew: false, data: item });
  }

  createService() {
    this.props.navigation.navigate('ServiceInput', { createNew: true, data: null })
  }

  renderCard() {
    var table = [];
    this.state.services.forEach((item, index) => {
      if (index % 2 == 0 && index + 1 < this.state.services.length) {
        var oddItem = this.state.services[index + 1];
        table.push(
          <Block key={index} style={styles.container}>
            <TouchableOpacity style={{ ...styles.cardService, marginRight: 10 }} onPress={() => { this.updateService(item) }}>
              <Image source={require('../assets/imgs/pet.png')} style={{ resizeMode: 'contain', width: 60, height: 60, marginTop: 10, paddingTop: 10 }} />
              <Text style={styles.priceTxt}>Price: {item.price} SGD</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.itemTxt}>{item.name}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ ...styles.cardService }} onPress={() => { this.updateService(oddItem) }}>
              <Image source={require('../assets/imgs/pet.png')} style={{ resizeMode: 'contain', width: 60, height: 60, marginTop: 10, paddingTop: 10 }} />
              <Text style={styles.priceTxt}>Price: {oddItem.price} SGD</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.itemTxt}>{oddItem.name}</Text>
              </View>
            </TouchableOpacity>
          </Block>
        )
      }
      else if (index % 2 == 0) {
        table.push(
          <Block key={index} style={styles.container}>
            <TouchableOpacity style={{ ...styles.cardService }} onPress={() => { this.updateService(item) }}>
              <Image source={require('../assets/imgs/pet.png')} style={{ resizeMode: 'contain', width: 60, height: 60, marginTop: 10, paddingTop: 10 }} />
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
      <Block center style={styles.home}>
        <ImageBackground
          source={require("../assets/imgs/background2.gif")}
          style={{ width, height, zIndex: 1 }}
        >

          <Popup visible={this.state.popUpDialog} choice={this.logout} question={"Do you want to log out?"} />
          <Block style={{ position: 'absolute', top: 0 }}>
            <ImageBackground source={require("../assets/imgs/Schedule1.png")} resizeMode='contain' style={styles.headerImage} />
            <View style={{ width: width, alignContent: 'center', alignItems: 'center', top: 15 }}>
              <Text color="#ffffff" size={40} style={{ marginLeft: 10, fontFamily: 'ITCKRIST' }}>
                Services
              </Text>
            </View>
          </Block>

          <View style={{ flex: 1, marginTop: 110, paddingBottom: 100 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ height: "100%" }}>
              <Block center flex={1}>
                {this.renderCard()}
              </Block>
            </ScrollView>

            <TouchableOpacity style={styles.addBtn} onPress={this.createService}>
              <MaterialCommunityIcons name="plus" size={50} style={styles.addIcon}></MaterialCommunityIcons>
            </TouchableOpacity>
          </View>

        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
    paddingBottom: 0,
    height: height,
    flexGrow: 1
  },
  headerImage: {
    width: width,
    height: 90,
    justifyContent: 'flex-start',
    borderRadius: 4,
    position: 'absolute',
  },
  container: {
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
  petIcon: {
    marginTop: 30,
    color: '#885DDA'
  },
  cardFooter: {
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
    bottom: 120
  },
  addIcon: {
    color: "white",
    fontWeight: "600",
  }
});

export default Services;
