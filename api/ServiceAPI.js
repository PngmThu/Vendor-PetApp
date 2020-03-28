import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from './AuthAPI';

export default class NotificationAPI{
    constructor() {
        this.globals = new Globals();
    }

    async getServiceByVendor(vendor){

        const url = this.globals.serverHost + '/services/vendor/'+vendor._id;

        let options = {
            headers: {token: AuthAPI.retrieveToken(), 'Access-Control-Allow-Origin':'*'}
        };

        let body = {};
        return axios.get(url, body, options)
    }



    async createNewService(service){
        const url = this.globals.serverHost + '/api/services/';

        let options = {
            headers: {token: AuthAPI.retrievetoken(), 'Access-Control-Allow-Origin':'*'}
        }

        let body = {service
        }
        return axios.post(url,body,options);
    }

    async updateService(service){
        const url = this.globals.serverHost + '/api/services/'+ service._id;
        let body = {service}
        let options = {
            headers: {token: AuthAPI.retirevetoken(), 'Access-Control-Allow-Origin':'*'}
        }
        return axios.put(url,body,options)
    }

    async deleteService(service){
        const url = this.globals.serverHost + '/api/services/'+ service._id;

        let options = {
            headers: {token: AuthAPI.retrevetoken(), 'Access-Control-Allow-Origin':'*'}
        }
        return axios.delete(url,options)        
    }
}