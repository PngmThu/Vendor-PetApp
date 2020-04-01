import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from './AuthAPI';

export default class VendorProfileAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    async updateUserById(vendor, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/vendor/' + vendor._id;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        axios.put(url, vendor, options)
        .then(res => {
            if(res.status == 200){
                callback(true);
            }
            else{
                callback(false);
            }
        })
        .catch(err => {
            console.log(err.response.data)
        })
    }

    async updatePassword(vendorId, password, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/vendor/password/' + vendorId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {password: password};

        axios.put(url, body, options)
        .then(res => {
            if(res.status == 200){
                callback(true);
            }
            else{
                callback(false);
            }
        })
        .catch(err => {
            callback(false);
            console.log(err.response.data)
        })

    }

    async getUserById(customerId, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/vendor/'+ customerId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        axios.get(url,options)
        .then(res => {
            if(res.status == 200){
                callback(res.data);
            }
        })
        .catch(err => {
            console.log(err.response.data);
        })
    }
}