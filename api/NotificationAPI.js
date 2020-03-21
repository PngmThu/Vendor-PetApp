import axios from 'axios';
import Globals from '../globals/globals';

export default class NotificationAPI{
    constructor() {
        this.globals = new Globals();
    }

    getNotificationList(){

        const url = this.globals.serverHost + '/api/notification';
        let token = "To be added later";

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {};
        return axios.get(url, body, options)
    }
}