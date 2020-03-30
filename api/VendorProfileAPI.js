import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from './AuthAPI';

export default class VendorProfileAPI{
    constructor() {
        this.globals = new Globals();
    }

    updateUserById(vendor, vendorId){
        const token = AuthAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/vendor/' + vendorId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {vendor};
        return axios.post(url, body, options)

    }

    updatePasswordById(vendor, vendorId){
        const token = AuthAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/vendor/password/' + vendorId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {vendor};
        return axios.post(url, body, options)

    }

    getUserById(customerId){
        const token = AuthAPI.retrieveToken();

        const url = this.globals.serverHost + 'api/vendor/'+ customerId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        return axios.get(url, options)
    }
}