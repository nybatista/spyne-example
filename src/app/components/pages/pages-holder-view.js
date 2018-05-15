// import Rx from "rxjs";
import {PageControl} from './page-control';

const R = require('ramda');
import {ViewStream} from 'spyne';
import {ImageContainerView} from '../images-component/image-container-view';
import {PhotogsContainerView} from '../photographers-component/photogs-container-view';
import {PageView} from './page-view';

export class PagesHolderView extends ViewStream {

	constructor(props = {}) {
        props.id='pages-holder';
       // props.template = require("./templates/lorem-ipsum.tmpl.html");
        props['class']='stage';
		super(props);

	}



	addActionListeners() {
		// return nexted array(s)
		return [
            ['CHANNEL_ROUTE.*', 'onRouteChangeEvent'],
            ["CHANNEL_UI.*", 'onUIEvent'],
            ["CHANNEL_WINDOW.*", 'onDomChannel']
        ];
	}

	broadcastEvents() {
		// return nexted array(s)
		return [

        ];
	}


	onUIEvent(item){
       if (this.isLocalEvent(item)){
           console.log("LCOAL EVENT ", item)
       } else {
           console.log("GLOBAL EVENT ", item)

       };

    }
    onDomChannel(e){
	    console.log("CHANNEL WINDOW ",this.isLocalEvent(e));
    }

	onRouteDeepLink(e){
	    console.log('route deep link ',e,this.isLocalEvent(e));
    }

    onRouteChangeEvent(item){
        const routeInfo = item.channelPayload;
        console.log('route info ',routeInfo);
        //let newObj = this.getRouteInfoJson(window.location.pathname);

        let pageId = routeInfo.pageId;
        this.appendView(new PageView({routeInfo}));


      /*  console.log("new route obj  is ",e,' --- ',routeInfo.data.hasOwnProperty('imageNum'));
        if (routeInfo.data.hasOwnProperty('imageNum')===false) {
            this.appendView(new PageView({routeInfo}));
        }*!/*/
    }


    afterRender() {
	    let pageControl = new PageControl();
	    pageControl.appendToNull();
        this.addChannel('ROUTE');
        this.addChannel("UI");
        this.addChannel("WINDOW");
      /*  this.getChannel('UI')
            .subscribe(p=>console.log('ui payload ',p));*/
	}

}
