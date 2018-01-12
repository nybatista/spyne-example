// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from 'spynejs';

export class PhotogsView extends ViewStream {

	constructor(props = {}) {
	    props.tagName = 'article';
	    props['class']='photogs-view';
        props.tmpl=require("./templates/photogs.tmp.html");

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
