// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from '../../../../../spyne/lib/spyne';
import {ImagesView} from './images-view';

export class ImageContainerView extends ViewStream {

	constructor(props = {}) {
        props.tagName='section';
        props['class']='page-content';
        props.id='images-container';
		super(props);

	}

	addActionListeners() {
		// return nexted array(s)
		return [];
	}

	broadcastEvents() {
		// return nexted array(s)
		return [];
	}



	loadImages(item){
	    this.photosData = item.channelPayload;
	    const loadImg = (data, i)=>{
	        data['indexNum']=i+1;
	       // console.log('data ',data);
	        this.appendView(new ImagesView({data}));
        };

	   this.photosData.forEach(loadImg);
    }

    afterRender2(){

    }

	afterRender() {
       const img$ = this.getChannel("ChannelData500px")
           .take(1)
           .subscribe(this.loadImages.bind(this));
	}

}
