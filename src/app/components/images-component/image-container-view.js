// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from 'spynejs';
import {ImagesView} from './images-view';

export class ImageContainerView extends ViewStream {

	constructor(props = {}) {
        props.tagName='section';
        props['class']='page-content';
        props.id='images-container';
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



	loadImages(p){
	    this.photosData = p.photos;

	    //this.photosData = p.photos.photo;
	    //this.photosData = this.photosData.slice(0,20);
	    window.pp = this.photosData;

	    const loadImg = (data)=>{
	        this.appendView(new ImagesView({data}));
	       // console.log('image data is ',data);
        };


	    this.photosData.forEach(loadImg);

       console.log("image data in load images ",this.photosData,' -- ',p);

    }

	afterRender() {

       const img$ = this.getChannel("ChannelData500px")
           .take(1)
           .subscribe(this.loadImages.bind(this));


	}

}
