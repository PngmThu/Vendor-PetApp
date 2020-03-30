import BaseModel from './BaseModel';

export class VendorProfile extends BaseModel {

	constructor(obj) {
		super(obj, VendorProfile.schema);
    }
    
	static schema = {
        _id: {type:'string'},
        email: {type: 'string'},
        password: {type: 'string'},
        mobile: {type: 'number'},
        name: {type: 'string'},
        address: {type: 'string'},
	};

    resolveData(){
        return super.resolveData(this);
    }
}