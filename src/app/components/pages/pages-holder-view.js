// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from 'spynejs';
import {ImageContainerView} from '../images-component/image-container-view';
import {PhotogsContainerView} from '../photographers-component/photogs-container-view';

export class PagesHolderView extends ViewStream {

	constructor(props = {}) {
        props.id='pages-holder';
        props['class']='stage';
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
	    this.appendView(new PhotogsContainerView());
       // this.appendView(new ImageContainerView());

	}

}
