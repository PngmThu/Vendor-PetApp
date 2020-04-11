import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from '../api/AuthAPI';

export default class BookingAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    /**
     * create new booking object.
     * @param {string} booking - this is the booking object to be created.
     * @param {function} callback - this is callback function to catch the result.
     */
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
    
    /**
     * retrieve booking object by id.
     * @param {string} bookingId - this is the booking id to be searched for in the database.
     * @param {function} callback - this is callback function to catch the result.
     */
    async getBookingById(bookingId, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/booking/' + bookingId;
        
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }
        console.log(bookingId)
        axios.get(url,options)
        .then(res => {
            if(res.status == 200){
                callback(res.data);
            }
        })
        .catch(err => {
            callback(false);
            console.log(err.response.data);
        })
    }

    /**
     * retrieve all booking objects by vendor id.
     * @param {string} vendorId - this is the vendor id to be searched for to retrieve booking object in the database.
     * @param {function} callback - this is callback function to catch the result.
     */
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

    /**
     * retrieve all booking objects by pet id from within a time period.
     * @param {string} vendorId - this is the vendor id to be searched for to retrieve booking object in the database.
     * @param {string} fromTime - this is the start time period to filter the bookings objects retrieved.
     * @param {string} toTime - this is the end time period to filter the bookings objects retrieved.
     * @param {function} callback - this is callback function to catch the result.
     */
    async getBookingByVendorFromTo(vendorId, fromTime, toTime, callback){
        const url = this.globals.serverHost + '/api/booking/vendor/time/' + vendorId + '/' + fromTime + '/' + toTime;
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

    /**
     * retrieve all booking objects by customer id.
     * @param {string} customerId - this is the customer id to be searched for to retrieve booking object in the database.
     * @param {function} callback - this is callback function to catch the result.
     */
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

    /**
     * retrieve all booking objects by pet id.
     * @param {string} petId - this is the customer id to be searched for to retrieve booking object in the database.
     * @param {function} callback - this is callback function to catch the result.
     */
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

    /**
     * delete booking object by booking id.
     * @param {string} bookingId - this is the booking id to be searched for to delete booking object in the database.
     * @param {function} callback - this is callback function to catch the result.
     */
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

    /**
     * update booking object by booking id.
     * @param {string} bookingId - this is the booking id to be searched for to update booking object in the database.
     * @param {string} booking - this is a booking object to update the existing booking in the database.
     * @param {function} callback - this is callback function to catch the result.
     */
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