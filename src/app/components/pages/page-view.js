// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from 'spynejs';
import {PhotogsContainerView} from '../photographers-component/photogs-container-view';
import {ImageContainerView} from '../images-component/image-container-view';
import {PageEmptyView} from './page-empty-view';

export class PageView extends ViewStream {

	constructor(props = {}) {
        props['class']='page-view';
		super(props);
        this.disposeReady = false;
	}


	getPageType(str){
        let type = PageEmptyView;
	    const types = {
	        "home" : PageEmptyView,
            "gallery" : ImageContainerView,
            "photographers" : PhotogsContainerView,
        };

        return types[str] || type;

    }

	addActionListeners() {
		// return nexted array(s)
		return [
            ['CHANNEL_ROUTE_CHANGE_EVENT', 'onRouteChangeEvent']
        ];
	}

	broadcastEvents() {
		// return nexted array(s)
		return [];
	}

    onRouteChangeEvent(e){

        //console.log(' route event in page view is ',e,this);
        if (this.disposeReady === true && e.data.hasOwnProperty('imageNum')===false) {
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
	    console.log("page view route info ",this.props.routeInfo);
        const routeData = this.props.routeInfo;
        const pageId = routeData.keywords.pageId;// !== undefined && routeData.data !== undefined && routeData.data.pageId !== undefined;
       // const val = isPageId  === true ? routeData.data.pageId.split('/')[0] : this.getLocationVal();
        const classType = this.getPageType(pageId);
        this.appendView(new classType());
        this.addChannel('ROUTE');

	}

}
