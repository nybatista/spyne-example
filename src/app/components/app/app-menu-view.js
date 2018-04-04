 import Rx from "rxjs";
 const R = require('ramda');
import {ViewStream} from '../../../../../spyne/lib/spyne';

export class AppMenuView extends ViewStream {

	constructor(props = {}) {
        props.tagName='section';
        props.id='menu';
        props.template = require("./templates/app-menu.tmpl.html");
		super(props);

	}

	addActionListeners() {
		// return nexted array(s)
		return [
		    ['SCROLL_EVENT', 'onScrollEvent']
        ];
	}



    broadcastEvents() {
		// return nexted array(s)
		return [];
	}

	onScrollEvent(e){
	    console.log('scroll event is ',e);
	    const shouldScroll = e.scrollY >= 45;
	    this.props.el.classList.toggle('hide', shouldScroll);
    }

	afterRender() {
	   // this.addChannel('WINDOW');

	 /*  this.getChannel('WINDOW')
            .subscribe((p)=>{
                console.log(' event is ',p);
        });*/
	}

}
