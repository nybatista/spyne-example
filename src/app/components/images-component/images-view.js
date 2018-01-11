// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from 'spyne';

export class ImagesView extends ViewStream {

	constructor(props = {}) {
        props.tagName='article';
        props.tmpl = require("./templates/images-view.tmpl.html");

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
