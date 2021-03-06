// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from 'spynejs';

export class PhotogsView extends ViewStream {

	constructor(props = {}) {
	    props.tagName = 'article';
	    props['class']='photogs-view';
        props.template=require("./templates/photogs.tmp.html");

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
