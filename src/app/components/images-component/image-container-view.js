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
		return [
		    ["CHANNEL_VIDEO_SYNC_EVENT", 'onSyncScrollEvent']
        ];
	}

	broadcastEvents() {
		// return nexted array(s)
		return [];
	}

	syncScroll(id){
	    let el = document.querySelector(id);
        TweenMax.to(window, 1, {scrollTo:{y:el, offsetY:70,  autoKill: false,    ease:Power3.easeInOut}});
    }

	onSyncScrollEvent(item){
	    let payload = item.channelPayload;
	    let elId = payload.label;
	    this.syncScroll(elId);
	    //let el = this.props.el$.query(payload.label).el;

	    console.log('item to scroll is ',payload);

    }

	addAnimation(){
        var elAll = document.querySelectorAll('section article')
        var tl = new TimelineMax();
        var addScrollAnim1 = (el)=>{
            tl.to(window, 2, {scrollTo:{y:el, offsetY:70, autoKill: false,  ease:Power1.easeInOut}}, "+=1");
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

	  // window.setTimeout(this.addAnimation.bind(this), 1000);

    }

    afterRender2(){

    }

	afterRender() {
	    this.addChannel("CHANNEL_VIDEO");

       const img$ = this.getChannel("ChannelData500px")
           .take(1)
           .subscribe(this.loadImages.bind(this));
	}

}
