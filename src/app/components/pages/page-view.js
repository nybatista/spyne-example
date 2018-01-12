// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from 'spynejs';

export class PageView extends ViewStream {

	constructor(props = {}) {
        props['class']='page-view';
		super(props);

	}

	addActionMethods() {
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
