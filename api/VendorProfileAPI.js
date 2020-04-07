import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from './AuthAPI';

export default class VendorProfileAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    /**
     * update user account by their account id.
     * @param {object} vendor - this is the vendor object to be updated.
     * @param {function} callback -  this is callback function to catch the result.
     */
    async updateUserById(vendor, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/vendor/' + vendor._id;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        axios.put(url, vendor, options)
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
     * to change password for user.
     * @param {string} vendorId - this is the customer id for password change.
     * @param {string} newPwd - this is the new password to be changed to.
     * @param {string} oldPwd - this is the old passowrd of the user to be replaced.
     * @param {function} callback - this is callback function to catch the result.
     */
    async updatePassword(vendorId, newPwd, oldPwd, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/vendor/password/' + vendorId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {password: newPwd, oldPwd: oldPwd};

        axios.put(url, body, options)
        .then(res => {
            if(res.status == 200){
                callback(true);
            }
            else{
                callback(false);
            }
        })
        .catch(err => {
            callback(err.response.data);
            console.log(err.response.data)
        })

    }

    /**
     * retrieve the user profile which is the customer object.
     * @param {string} vendorId - this is the id of the customer to be retrieve.
     * @param {function} callback - this is callback function to catch the result.
     */
    async getUserById(vendorId, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/vendor/'+ vendorId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

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
}