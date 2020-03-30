import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from '../api/AuthAPI';

export default class BookingAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    async createBooking(booking, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/booking/add';

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        axios.post(url, booking, options)
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
    
    async getBookingById(bookingId, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/booking/' + bookingId;
        
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

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

    async getBookingByVendorId(vendorId, callback){
        const url = this.globals.serverHost + '/api/booking/vendor/' + vendorId;
        const token = await this.authAPI.retrieveToken();
        
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'},
        }

        axios.get(url, options)
        .then(res => {
            if(res.status == 200){
                callback(res.data);
            }
        })
        .catch(err => {
            console.log(err)
            console.log(err.response.data);
        })
    }

    async getBookingByCustomerId(customerId, callback){
        const token = await this.authAPI.retrieveToken();
        const url = this.globals.serverHost + '/api/booking/customer/' + customerId;
        
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

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

    async getBookingByPetId(petId, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/booking/pet/' + petId;
        
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

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

    async deleteBookingById(bookingId, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/booking/'+ bookingId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        axios.delete(url,options)
        .then(res => {
            if(res.status == 200){
                callback(true);
            }
            else{
                callback(false);
            }
        })
        .catch(err => {
            console.log(err.response.data);
        })
    }

    async updateBookingById(bookingId, booking, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/booking/'+ bookingId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        axios.put(url, booking, options)
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

}