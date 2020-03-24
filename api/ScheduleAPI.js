import axios from 'axios';
import Globals from '../globals/globals';

export default class NotificationAPI{
    constructor() {
        this.globals = new Globals();
    }

    postUnavailableDate(token,vendorId,date){

        const url = this.globals.serverHost + '/api/schedule/add';

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {date: date,vendorId: vendorId};
        return axios.post(url, body, options)
    }

    getUnavailableDateById(token,id){

        const url = this.globals.serverHost + '/api/schedule/'+id;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        return axios.get(url, options)
    }

    getUnavailableDateByVendorId(token,vendorId){
        const url = this.globals.serverHost + '/api/schedule/vendorId/'+vendorId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        return axios.get(url,options);
    }

    deleteUnavailableDateById(token, id){
        const url = this.globals.serverHost + '/api/schedule/'+id;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        return axios.delete(url,options);
    }
}