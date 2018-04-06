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
		return [
		    ["CHANNEL_UI_CLICK_EVENT", "onClicked"]
        ];
	}

	onClicked(item){
	    console.log('item is clicked ');
    }

	broadcastEvents() {
		// return nexted array(s)
		return [
		    ['button#testbtn', 'click']

        ];
	}

	afterRender() {
        this.addChannel("UI");
	}

}
