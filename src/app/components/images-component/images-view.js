// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from 'spynejs';

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
	    let img = this.props.el$.query('img').el;

	    const onLoad = (e)=>{
	      console.log('img loaded ',e);
	      img.classList.add('reveal');
	      this.props.el$.query('aside').el.remove();
	      img.onload = ()=>{};
	      img = undefined;
        };

       // img.addEventListener('onload', onLoad);
        img.onload = onLoad;


	}

}
