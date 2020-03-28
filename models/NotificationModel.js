import BaseModel from './BaseModel';

export default class Notification extends BaseModel {

	constructor(obj) {
		super(obj, Notification.schema);
    }
    
	static schema = {
        _id: {type: 'string'},
        content: {type: 'string'},
        time: {type: 'Date'},
        customerId: {type: 'string'},
        vendorId: {type: 'string'}
	};

    resolveData(){
        console.log(super.resolveData(this));
    }
}