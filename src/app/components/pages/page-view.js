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

    onRouteChangeEvent(e){
        console.log(' route event in page view is ',e);
    }


    afterRender() {
        this.appendView(new PhotogsContainerView());
        // this.appendView(new ImageContainerView());
        //this.appendView(new PageEmptyView());
	}

}
