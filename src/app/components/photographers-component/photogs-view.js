// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from 'spyne';

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
		return [
		    ['dl', 'click']

        ];
	}

	afterRender() {
       // console.log('photogs view ',this.props.data);
	}

}
