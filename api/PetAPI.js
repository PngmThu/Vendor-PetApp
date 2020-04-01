import axios from 'axios';
import Globals from '../globals/globals';
import AuthAPI from '../api/AuthAPI';

export default class PetAPI{
    constructor() {
        this.globals = new Globals();
        this.authAPI = new AuthAPI();
    }

    createPet(pet){
        const token = this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/pet/add';

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {pet};

        return axios.post(url, body, options)
    }

    updatePetById(pet, petId){
        const token = this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/pet/' + petId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        let body = {pet};
        return axios.post(url, body, options)

    }

    async getPetById(petId, callback){
        const token = await this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/pet/'+ petId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };
        axios.get(url, options).then((res) => {
            if (res.status != 200){
                callback(false);
            }
            else {
                callback(res.data)
            }
        })
        .catch(err => {
            console.log(err.response.data);
            callback(false);
        })
    }

    getPetByCustomerId(customerId){
        const token = this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/pet/customer/'+ customerId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        };

        return axios.get(url, options)
    }

    deletePetByPetId(petId){
        const token = this.authAPI.retrieveToken();

        const url = this.globals.serverHost + '/api/pet/'+ petId;

        let options = {
            headers: {token: token, 'Access-Control-Allow-Origin':'*'}
        }

        return axios.delete(url,options);
    }

}