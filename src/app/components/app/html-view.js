// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from 'spynejs';

export class HTMLView extends ViewStream {

	constructor(props = {}) {

		super(props);

	}

	addActionListeners() {
		// return nexted array(s)
		return [];
	}

	broadcastEvents() {
		// return nexted array(s)
		return [];
	}

	afterRender() {

	}

}
