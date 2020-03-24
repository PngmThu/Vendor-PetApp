import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import AuthAPI from '../api/AuthAPI';

export default class AuthLoadingScreen extends React.Component {

    constructor(props){
        super(props);
        this.authAPI = new AuthAPI();
    }
    
    componentDidMount() {
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await this.authAPI.retrieveToken();
        this.props.navigation.navigate(userToken ? 'Main' : 'Account');
    };

    // Render any loading content that you like here
    render() {
        return (
        <View>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
        );
    }
}