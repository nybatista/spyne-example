// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from 'spynejs';

export class PageEmptyView extends ViewStream {

	constructor(props = {}) {
        props.tagName='section';
        props['class']='empty';
        props.tmpl = require("./templates/page-empty.tmpl.html");
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
