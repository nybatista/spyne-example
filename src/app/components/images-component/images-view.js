// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from 'spynejs';
import {TweenMax} from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';


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

	    const topNum = this.props.el.offsetTop+45;

        let elHtml = document.querySelector('html');
        const scrollNum = window.pageYOffset;

        let moveWindow = ()=> {
            this.hideOverflow(true);

            //elHtml.scrollTo(0, 0);
            window.pageYOffset = 0;
            const styleStr = `top:${scrollNum * -1}px;`;
            elHtml.style.cssText = styleStr;
            console.log({elHtml, styleStr, topNum});

        };
        moveWindow();
        //window.setTimeout(moveWindow,1000);
        TweenMax.to(elHtml, .3, {top:topNum*-1, ease:Sine.easeInOut});
        //window.setTimeout(this.hideOverflow.bind(this),150);

    }

    hideOverflow(bool=true){
        let elHtml = document.querySelector('html');
        elHtml.classList.toggle('expand',bool);
    }

	afterRender() {

	    let img = this.props.el$.query('img').el;
	    this.hideOverflow(false);

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
