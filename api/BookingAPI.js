import axios from 'axios';
import Globals from '../globals/globals';

export default class BookingAPI{
    constructor() {
        this.globals = new Globals();
    }

    getBookingList(){

        const url = this.globals.serverHost + '/api/booking';
        let token = "To be added later";

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {};
        return axios.get(url, body, options)
    }
}