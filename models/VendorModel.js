import BaseModel from './BaseModel';

export class Vendor extends BaseModel {

	constructor(obj) {
		super(obj, Vendor.schema);
    }
    
	static schema = {
        _id: {type:'string'},
        email: {type: 'string'},
        createdAt: {type: 'string'},
        updatedAt: {type: 'string'},
        rememberToken: {type: 'string'},
        mobile: {type: 'number'},
        name: {type: 'string'},
        postalCode: {type: 'number'},
        address: {type: 'string'},
		$key: {type: 'string'},
	};

    resolveData(){
        return super.resolveData(this);
    }
}
