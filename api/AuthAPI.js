import {AsyncStorage} from 'react-native';
import axios from 'axios';
import Globals from '../globals/globals';

export default class AuthAPI{
    constructor(){
        this.globals = new Globals();
    }

    login(email, password, callback){
        const url = this.globals.serverHost + '/api/auth/login/vendor';

        let options = {
            headers: {'Access-Control-Allow-Origin':'*'}
        };

        let body = {email: email, password: password};
        axios.post(url, body, options)
        .then(res => {
            if(res.status == 200){
                this.storeToken(res.data.token);
                callback(true);
            }
            else{
                callback("Authentication error!")
            }
        })
        .catch(err => {
            callback(err.response.data)
        })
    }

    forgetPassword(email){
        const url = this.globals.serverHost + '/api/auth/password/vendor';

        let options = {
            headers: {'Access-Control-Allow-Origin':'*'}
        };
        let body = {email: email};
        axios.post(url, body, options)
        .then(res => {
            if(res.status == 200){
                this.storeToken(res.data.token);
                callback(true);
            }
            else{
                callback("Authentication error!")
            }
        })
        .catch(err => {
            callback(err.response.data)
        })
    }

    async storeToken(token){
        try{
            await AsyncStorage.setItem('token', token);
        }
        catch(err){
            console.log(err);
        }
    }

    async retrieveToken(){
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
              return value
            }
            else{
                return null
            }
        } catch (error) {
            return null
        }
    }

    async clearToken(){
        await AsyncStorage.removeItem('token');
    }
}