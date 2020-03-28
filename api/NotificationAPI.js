import axios from 'axios';
import Globals from '../globals/globals';

export default class NotificationAPI{
    constructor() {
        this.globals = new Globals();
    }

    postNotification(token, content, time, customerId, vendorId){

        const url = this.globals.serverHost + '/api/notification/add';

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {content: content, time: time, customerId: customerId, vendorId: vendorId};
        return axios.post(url, body, options)
    }

    getNotificationById(token,id){

        const url = this.globals.serverHost + '/api/notification/'+id;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        return axios.get(url, options)
    }

    getNotificationByVendorId(token,vendorId){

        const url = this.globals.serverHost + '/api/notification/vendor/'+vendorId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        return axios.get(url, options)
    }

}