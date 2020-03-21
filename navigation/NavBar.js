import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigaticreateAppContainer, createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialIcons } from '@expo/vector-icons';

class MainScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MaterialIcons name='apps' size={20} style={styles.btnIcon}
                        onPress={() => navigation.navigate("Home")}/>
        </View>
      );
    }
  }

class NotiScreen extends React.Component {
    render() {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MaterialIcons name='notifications' size={20} style={styles.btnIcon}
                        onPress={() => navigation.navigate("Home")}/>
        </View>
        );
    }
}

class ServiceScreen extends React.Component {
    render() {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MaterialIcons name='list' size={20} style={styles.btnIcon}
                        onPress={() => navigation.navigate("Home")}/>
        </View>
        );
    }
}

class ProfileScreen extends React.Component {
    render() {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MaterialIcons name='person' size={20} style={styles.btnIcon}
                        onPress={() => navigation.navigate("Home")}/>
        </View>
        );
    }
}

const Tab = createBottomTabNavigator({
    Main: MainScreen,
    Noti: NotiScreen,
    Service: ServiceScreen,
    Profile: ProfileScreen
});

const styles = StyleSheet.create({
    btnIcon:{

    }
})

export default Tab;