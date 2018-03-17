// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from 'spynejs';
import {TweenMax} from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';


export class ImagesView extends ViewStream {

	constructor(props = {}) {
        props.tagName='article';
        props.template = require("./templates/images-view.tmpl.html");

		super(props);


	}

    addActionListeners() {
        // return nexted array(s)
        return [

            ['CHANNEL_ROUTE_CHANGE_EVENT', 'onRouteChangeEvent']

        ];
    }

	broadcastEvents() {
		// return nexted array(s)
		return [
		    ['article dl', 'click']
        ];
	}

    onRouteChangeEvent(item){
       // console.log("IMAGE: ",e.data.imageNum,this.props.data.indexNum,e.data.imageNum*1 === this.props.data.indexNum );
        //console.log('item route in images view is ',item);

       /* if (e.data.imageNum*1 === this.props.data.indexNum){
             this.onAnimate(e);
        }*/
    }

	onAnimate(e){
	 //   console.log("e is ",e.data.el === this.props.el, e.data.el, this.props.el);
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

        let addRoute = ()=>{
            this.addChannel('ROUTE');

        };
       // window.setTimeout(addRoute, 100);

       // addRoute();

        let addImg = ()=>{
            let img = this.props.el$.query('img').el;

           // console.log('img ',img);

            this.hideOverflow(false);

            const onLoad = (e)=>{
                if (this!==undefined && this.props!==undefined) {
                    img.classList.add('reveal');
                    this.props.el$.query('aside').el.remove();
                    img.onload = () => {};
                    img = undefined;
                } else {
                    img.onload = () => {};
                    img = undefined;
                }
            };

            img.onload = onLoad;

        };

        addImg();

        addRoute();



/*

        */

	  /*  this.getChannel('UI')
            .filter(p => p.data.el === this.props.el)
            .subscribe(this.onClick.bind(this));
*/
       // img.addEventListener('onload', onLoad);
       //img.onload = onLoad;


	}

}
