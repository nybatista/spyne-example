// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from 'spynejs';
import {ImageContainerView} from '../images-component/image-container-view';
import {PhotogsContainerView} from '../photographers-component/photogs-container-view';
import {PageView} from './page-view';

export class PagesHolderView extends ViewStream {

	constructor(props = {}) {
        props.id='pages-holder';
        props['class']='stage';
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
       // console.log(' route event in page holder is ',e);
        const routeInfo = e;
        this.appendView(new PageView({routeInfo}));

    }


    afterRender() {
	   // this.appendView(new PhotogsContainerView());
       // this.appendView(new ImageContainerView());

        this.addChannel('ROUTE');


       // const adder = ()=>);
       // window.setTimeout(adder, 2000);

       // adder();

	}

}
