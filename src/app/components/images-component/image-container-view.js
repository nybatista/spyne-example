// import Rx from "rxjs";
// const R = require('ramda');
import {ViewStream} from 'spyne';
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

	addAnimation(){
        var elAll = document.querySelectorAll('section article')
        var tl = new TimelineMax();
        var addScrollAnim1 = (el)=>{
            tl.to(window, 3, {scrollTo:{y:el, offsetY:70,  ease:Sine.easeIn}}, "+=1");
        };
        elAll.forEach(addScrollAnim1);



    }




	loadImages(item){
	    this.photosData = item.channelPayload;
	    const loadImg = (data, i)=>{
	        data['indexNum']=i+1;
	       // console.log('data ',data);
	        this.appendView(new ImagesView({
                id: "img-"+i*1,
                data
	        }));
        };

	   this.photosData.forEach(loadImg);

	   window.setTimeout(this.addAnimation.bind(this), 6000);

    }

    afterRender2(){

    }

	afterRender() {
       const img$ = this.getChannel("ChannelData500px")
           .take(1)
           .subscribe(this.loadImages.bind(this));
	}

}
