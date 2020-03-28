import {axios} from 'axios');
import Globals from '../globals/globals';
import AuthAPI from './AuthAPI';
import Vendor from '../models/VendorModel'

 class VendorAPI{
    constructor(){
        this.globals = new Globals();
    }

    async createVendor(vendor){
        const url ='http://localhost:4000/api/account/vendor'
        
        let options = {
        }

        let body = {vendor};
        return axios.post(url,body,options);
    }
}
