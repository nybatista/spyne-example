// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from 'spynejs';
import {PhotogsContainerView} from '../photographers-component/photogs-container-view';
import {ImageContainerView} from '../images-component/image-container-view';
import {PageEmptyView} from './page-empty-view';
import {ViewStream} from 'spynejs';

export class PageView extends ViewStream {

	constructor(props = {}) {
        props['class']='page-view';
		super(props);
        this.disposeReady = false;
	}


	getPageType(str){
        let type = PageEmptyView;
	    const types = {
	        "empty" : PageEmptyView,
            "images" : ImageContainerView,
            "photogs" : PhotogsContainerView,
            "page-two" : PhotogsContainerView,
            "page-one" : ImageContainerView,
            "/" : PageEmptyView
        };

        return types[str] || type;

    }

	addActionMethods() {
		// return nexted array(s)
		return [
            ['CHANNEL_ROUTE_CHANGE_EVENT', 'onRouteChangeEvent']
        ];
	}

	broadcastEvents() {
		// return nexted array(s)
		return [];
	}
/*	onDispose(p){
        console.log('THIS PAGE VIEW ON IDPOSE ',this);
	    super.onDispose(p);
    }*/

    onRouteChangeEvent(e){


        //console.log(' route event in page view is ',e,this);
        if (this.disposeReady === true) {
            // super.onDispose();
            this.onDispose(e)
        }
        this.disposeReady = true;

    }

    getLocationVal(){
        let str = window.location.pathname;
        if (str.length>1){
            const re = /^\//g;
            str = str.replace(re, '');
        }
        return str;

    }


    afterRender() {
        const routeData = this.props.routeInfo;
       // console.log("this pageview is ",this);

        const isPageId = routeData !== undefined && routeData.data !== undefined && routeData.data.pageId !== undefined;
        const val = isPageId  === true ? routeData.data.pageId : this.getLocationVal();
        const classType = this.getPageType(val);
        //console.log("page View ",{routeData,val, classType});

        ///this.classType = this.getPageType(this.props.type);
      //  console.log("page view type ",val,classType);

        this.appendView(new classType());
        // this.appendView(new ImageContainerView());
        //this.appendView(new PageEmptyView());
        this.addChannel('ROUTE');

	}

}
