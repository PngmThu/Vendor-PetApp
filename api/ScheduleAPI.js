import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from './AuthAPI';

export default class ScheduleAPI{

    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    async createUnavailableDate(unavailableDate, callback){

        const url = this.globals.serverHost + '/api/schedule/add';
        const token = await this.authAPI.retrieveToken();
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = unavailableDate;
        axios.post(url, body, options)
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


    async getUnavailableDateByVendor(vendor, callback){
        const url = this.globals.serverHost + '/api/schedule/vendor/'+vendor._id;
        const token = await this.authAPI.retrieveToken();
        
        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        axios.get(url, options)
        .then(res => {
            if(res.status == 200){
                callback(res.data);
            }
        })
        .catch(err => {
            console.log(err.response.data);
        })
    }

    async deleteUnavailableDate(id, callback){
        const url = this.globals.serverHost + '/api/schedule/' + id;
        const token = await this.authAPI.retrieveToken();

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        axios.delete(url, options)
        .then(res => {
            if(res.status == 200){
                callback(true);
            }
        })
        .catch(err => {
            console.log(err.response.data)
        })
    }
}