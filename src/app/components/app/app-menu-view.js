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
	   // this.addChannel('DOM');

	 /*  this.getChannel('DOM')
            .subscribe((p)=>{
                console.log(' event is ',p);
        });*/
	}

}
