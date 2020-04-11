import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from './AuthAPI';

export default class ScheduleAPI {

    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    /**
     * mark a date as unavailable by creating the date and vendor as attributes of a schedule object.
     * @param {date} unavailableDate - this is the date to be marked unavailable.
     * @param {function} callback - this is callback function to catch the result.
     */
    async createUnavailableDate(unavailableDate, callback) {

        const url = this.globals.serverHost + '/api/schedule/add';
        const token = await this.authAPI.retrieveToken();
        let options = {
            headers: { token: token, 'Access-Control-Allow-Origin': '*' }
        };

        let body = unavailableDate;
        axios.post(url, body, options)
            .then(res => {
                if (res.status == 200) {
                    callback(true);
                }
                else {
                    callback(false);
                }
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    /**
    * retrieve a list of all unavailable dates from a vendor.
    * @param {object} vendor - this is the vendor to have unavailable date added 
    * @param {*} callback - this is callback function to catch the result.
    */
    async getUnavailableDateByVendor(vendor, callback) {
        const url = this.globals.serverHost + '/api/schedule/vendor/' + vendor._id;
        const token = await this.authAPI.retrieveToken();

        let options = {
            headers: { token: token, 'Access-Control-Allow-Origin': '*' }
        }

        axios.get(url, options)
            .then(res => {
                if (res.status == 200) {
                    callback(res.data);
                }
            })
            .catch(err => {
                console.log(err.response.data);
            })
    }

    /**
     * delete an available date to make a data available.
     * @param {string} id - this is the id of schedule object to be deleted.
     * @param {function} callback - this is callback function to catch the result.
     */
    async deleteUnavailableDate(id, callback) {
        const url = this.globals.serverHost + '/api/schedule/' + id;
        const token = await this.authAPI.retrieveToken();

        let options = {
            headers: { token: token, 'Access-Control-Allow-Origin': '*' }
        }

        axios.delete(url, options)
            .then(res => {
                if (res.status == 200) {
                    callback(true);
                }
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }
}