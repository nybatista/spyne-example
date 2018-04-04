// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from 'spyne';

export class PageEmptyView extends ViewStream {

	constructor(props = {}) {
        props.tagName='section';
        props['class']='empty';
        props.template = require("./templates/page-empty.tmpl.html");
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
