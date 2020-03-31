import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from './AuthAPI'
export default class NotificationAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
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

    async getNotificationByVendor(vendorId,callback){

        const url = this.globals.serverHost + '/api/notification/vendor/'+vendorId;
        const token = await this.authAPI.retrieveToken();
        let options = {
            headers: {'token':token, 'Access-Control-Allow-Origin':'*'}
        };
        // console.log("options: "+options.headers['token'])
        // console.log("aaaaa");
        await axios.get(url,options)
             .then(res=>{
                 if (res.status==200){
                     console.log(res)
                     callback(false,res.data);
                 }
                 else {
                     console.log("errr1")
                     callback(res.data);
                 }
             })
             .catch(err=>{
                 console.log("error2")
                 callback(err);
             })

        // console.log('jeljwelrj')
    }

}