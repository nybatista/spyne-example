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
		return [
		    ['article', 'click']
        ];
	}

	onClick(e){
	    console.log("e is ",e.data.el === this.props.el, e.data.el, this.props.el);
	    this.props.el$.addClass('expand');
    }

	afterRender() {
	    let img = this.props.el$.query('img').el;

	    const onLoad = (e)=>{
	      //console.log('img loaded ',e);
	      img.classList.add('reveal');
	      this.props.el$.query('aside').el.remove();
	      img.onload = ()=>{};
	      img = undefined;
        };


	    this.getChannel('UI')
            .filter(p => p.data.el === this.props.el)
            .subscribe(this.onClick.bind(this));

       // img.addEventListener('onload', onLoad);
        img.onload = onLoad;


	}

}
