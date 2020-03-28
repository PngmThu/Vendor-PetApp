import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from './AuthAPI';

export default class NotificationAPI{
    constructor() {
        this.globals = new Globals();
    }

    async createUnavailableDate(vendor,date){

        const url = this.globals.serverHost + '/api/schedule/add';

        let options = {
            headers: {token: AuthAPI.retrieveToken(), 'Access-Control-Allow-Origin':'*'}
        };

        let body = {date: date,vendorId: vendor._id};
        return axios.post(url, body, options)
    }


    async getUnavailableDateByVendorId(vendor){
        const url = this.globals.serverHost + '/api/schedule/vendorId/'+vendor._id;

        let options = {
            headers: {token: AuthAPI.retrieveToken(), 'Access-Control-Allow-Origin':'*'}
        }

        return axios.get(url,options);
    }

    async deleteUnavailableDateById(id){
        const url = this.globals.serverHost + '/api/schedule/'+id;

        let options = {
            headers: {token: AuthAPI.retrevetoken(), 'Access-Control-Allow-Origin':'*'}
        }

        return axios.delete(url,options);
    }
}