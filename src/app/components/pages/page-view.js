// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from 'spyne';
import {PhotogsContainerView} from '../photographers-component/photogs-container-view';
import {ImageContainerView} from '../images-component/image-container-view';
import {PageEmptyView} from './page-empty-view';
const R = require('ramda');

export class PageView extends ViewStream {

	constructor(props = {}) {
        props['class']='page-view';
        props['pageId']=props.routeInfo.keywords.pageId;
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

    onRouteChangeEvent(item){

	    const routePageId = R.path(['channelPayload', 'keywords', 'pageId'], item);
	    const isNotCurrentPageId = this.props.pageId === routePageId;

        //console.log(' route event in page view is ',e,this);
        if (isNotCurrentPageId === false) {
            // super.onDispose();
            console.log('dispose is ready',item, {routePageId, isNotCurrentPageId});
            this.onDispose()
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
        const classType = this.getPageType(this.props.pageId);
        this.appendView(new ImageContainerView());
        this.addChannel('ROUTE');

	}

}
