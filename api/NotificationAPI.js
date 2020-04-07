import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from './AuthAPI'
export default class NotificationAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    /**
    * create new notification object.
    */
    postNotification(token, content, time, customerId, vendorId){

        const url = this.globals.serverHost + '/api/notification/add';

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {content: content, time: time, customerId: customerId, vendorId: vendorId};
        return axios.post(url, body, options)
    }

    /**
     * retrieve notification object by id.
     * @param {string} token - this is the token for user login session.
     * @param {string} id - this is the id for a particular notificaiton object.
     */
    getNotificationById(token,id){

        const url = this.globals.serverHost + '/api/notification/'+id;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        return axios.get(url, options)
    }


    /**
     * retrieve notification object by id.
     * @param {string} vendorId - this is the vendor id to be querried.
     * @param {string} callback - this is callback function to catch the result.
     */
    async getNotificationByVendor(vendorId, callback){

        const url = this.globals.serverHost + '/api/notification/vendor/'+vendorId;
        const token = await this.authAPI.retrieveToken();
        
        let options = {
            headers: {'token':token, 'Access-Control-Allow-Origin':'*'}
        };

        axios.get(url, options)
        .then(res=>{
            if (res.status==200){
                callback(res.data);
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    /**
     * retrieve all notification object within a time period for a particular vendor.
     * @param {string} vendorId - this is the customer id to be searched for to retrieve notification object in the database.
     * @param {string} fromTime - this is the time period to filter the notification objects retrieved.
     * @param {function} callback - this is callback function to catch the result.
     */
    async getNotificationByVendorFromTime(vendorId, fromTime, callback){

        const url = this.globals.serverHost + '/api/notification/vendor/'+ vendorId + "/" + fromTime;
        const token = await this.authAPI.retrieveToken();
        
        let options = {
            headers: {'token':token, 'Access-Control-Allow-Origin':'*'}
        };

        axios.get(url, options)
        .then(res=>{
            if (res.status==200){
                callback(res.data);
            }
        })
        .catch(err=>{
            console.log(err);
            callback(false)
        })
    }
}