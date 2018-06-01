// import Rx from "rxjs";
import {PhotogsView} from './photogs-view';

const R = require('ramda');
import {ViewStream} from 'spyne';

export class PhotogsContainerView extends ViewStream {

	constructor(props = {}) {
        props.tagName='section';
        props['class']='page-content';
        props.id='photogs-container';
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
	    this.props.data = R.prop('channelPayload', item);
       // console.log('photog data ',item,this.props.data);
	    const addNewPhotog = (data)=>{
	     //   console.log('user is ',data);
	        this.appendView(new PhotogsView({data}));
        };
	    const returnUser = d => d.user;

        function removeDuplicates(myArr, prop) {
            return myArr.filter((obj, pos, arr) => {
                return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
            });
        }
        this.userData = this.props.data.map(returnUser);
        this.userData = removeDuplicates(this.userData, 'id');

        this.userData.forEach(addNewPhotog);
	    //console.log("load images in photogs ", this.userData);
    }



    afterRender() {
	     const img$ = this.getChannel("ChannelData500px")
        .take(1)
        .subscribe(this.loadImages.bind(this));

    }

}
