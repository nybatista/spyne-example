// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from 'spynejs';

export class AppMenuView extends ViewStream {

	constructor(props = {}) {
        props.tagName='section';
        props.id='menu';
        props.tmpl = require("./templates/app-menu.tmpl.html");
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
