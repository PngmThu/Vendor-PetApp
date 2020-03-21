import BaseModel from './BaseModel';

export default class Notification extends BaseModel {

	constructor(obj) {
		super(obj, Notification.schema);
    }
    
	static schema = {
        content: {type: 'string'},
        time: {type: 'string'},
        vendor: {type: 'object'},
        $key: {type: 'string'}
	};

    resolveData(){
        console.log(super.resolveData(this));
    }
}
