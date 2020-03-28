import React from "react";
import { StyleSheet } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";

import { fadeIn } from 'react-navigation-transitions';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// screens
import Home from "../screens/Home";
import ScheduleDetails from "../screens/ScheduleDetails";
import Profile from "../screens/Profile";
import Services from "../screens/Services";
import ServiceInput from "../screens/ServiceInput";
import ChangePassword from "../screens/ChangePassword";
import Login from "../screens/Login";
import Register from "../screens/Register";
import ForgetPassword from "../screens/ForgetPassword"

// drawer
import { MaterialIcons } from '@expo/vector-icons';

// header for screens

const transitionConfig = () => fadeIn();

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions:{
        header: null
      }
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions:{
        header: null
      }
    }
  },

);

const ServicesStack = createStackNavigator(
  {
    ServiceInput: {
      screen: ServiceInput,
      navigationOptions:{
        header: null
      }
    },
    Services: {
      screen: Services,
      navigationOptions:{
        header: null
      }
    },
  },
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    ScheduleDetails: {
      screen: ScheduleDetails,
      navigationOptions: {
        header: null
      }
    }
  },

);

const LoginStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      }
    },
    Register: {
      screen: Register,  
      navigationOptions: {
        header: null,
      }
    },
    ForgetPassword: {
      screen: ForgetPassword,  
      navigationOptions: {
        header: null,
      }
    },
  },

);

const TabNavigator = createBottomTabNavigator({
  Services: ServicesStack,
  Profile: ProfileStack,
  Home: HomeStack,
}, {
  defaultNavigationOptions: ({ navigation }) => {
    const route = navigation.state.routeName;

    return {
      tabBarIcon: ({ tintColor }) => {
        const name = {
          'Home': 'apps',
          'Profile': 'person',
          'Services': 'list'
        }[route]
        return <MaterialIcons name={name} color={tintColor} size={22} />
      },
      tabBarOptions: {
        activeBackgroundColor: 'rgba(0,0,0, 0.3)',
        activeTintColor: 'white',
        inactiveTintColor: '#fafafa',
        style: styles.container,
        tabStyle: styles.tab,
      }
    }
  }
});

const AppContainer = createAppContainer(createStackNavigator({
  Main: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  }, 
  Account: {
    screen: LoginStack,  
    navigationOptions: {
      header: null,
    }
  }, 
  }
));
export default AppContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(45,45,45, 0.7)',
    height: 40,
    position: 'absolute',
  },
  tab: {
    borderRadius: 20,
  }
});