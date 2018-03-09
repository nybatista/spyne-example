// import Rx from "rxjs";
const R = require('ramda');
import {ViewStream} from 'spynejs';
import {ImageContainerView} from '../images-component/image-container-view';
import {PhotogsContainerView} from '../photographers-component/photogs-container-view';
import {PageView} from './page-view';

export class PagesHolderView extends ViewStream {

	constructor(props = {}) {
        props.id='pages-holder';
        props.template = require("./templates/lorem-ipsum.tmpl.html");
        props['class']='stage';
		super(props);

	}


	getRouteInfoJson(path){

	    const routeConfig = {
            "route": {
                "param": "pageId",
                "map": {
                    "page-one": {
                        "map": "images",
                        "route": {
                            "param": "imageNum"
                        }
                    },
                    "page-two": {
                        "map": "photogs",
                        "route": {
                            "param": "photogNum"
                        }
                    }
                }
            }
        };



	    let arr = path.slice(1).split('/');
        // MAKE JUST routeParam, routeValue
        const routeData = {
            routeName: 'pageId',
            routeMatches: {
                "" : "empty",
                "/" : "empty",
                "page-one" : {
                    routeVal: 'images',
                    routeName: 'imageNum'
                },
                "page-two" : {
                    routeVal: 'photogs',
                    routeName: 'photogNum'
                }

            }

        };
        let paramArr = [];
        let firstParam = routeData.routeName;
        let firstVal = '';
        paramArr.push(firstParam);
        if (typeof(routeData.routeMatches[arr[0]])==="string"){
            firstVal = routeData.routeMatches[arr[0]];
        } else {
            firstVal = routeData.routeMatches[arr[0]].routeVal;
        }

        if (arr.length>1){
            const secondParam = routeData.routeMatches[arr[0]].routeName;
            paramArr.push(secondParam);
        }
        console.log("new vals ",firstVal,arr,firstParam);

        arr[0] = firstVal;
        let zipObj = R.zipObj(paramArr, arr);


        return zipObj;








    }

	addActionMethods() {
		// return nexted array(s)
		return [
            ['CHANNEL_ROUTE_CHANGE_EVENT', 'onRouteChangeEvent'],
            ["CHANNEL_UI.*", 'onUIEvent'],
            ["CHANNEL_WINDOW.*", 'onDomChannel']
        ];
	}

	broadcastEvents() {
		// return nexted array(s)
		return [
		    ["#lorem-ipsum", "click"]

        ];
	}


	onUIEvent(item){
       if (this.isLocalEvent(item)){
           console.log("LCOAL EVENT ", item)
       } else {
           console.log("GLOBAL EVENT ", item)

       };

    }
    onDomChannel(e){
	    console.log("CHANNEL WINDOW ",this.isLocalEvent(e));
    }

	onRouteDeepLink(e){
	    console.log('route deep link ',e,this.isLocalEvent(e));
    }

    onRouteChangeEvent(e){
        console.log('route  link ',e,this.isLocalEvent(e));
        /*const routeInfo = e;

        //let newObj = this.getRouteInfoJson(window.location.pathname);

        let pageId = routeInfo.pageId;



        console.log("new route obj  is ",e,' --- ',routeInfo.data.hasOwnProperty('imageNum'));
        if (routeInfo.data.hasOwnProperty('imageNum')===false) {
            this.appendView(new PageView({routeInfo}));
        }*/
    }


    afterRender() {
        this.addChannel('ROUTE');
        this.addChannel("UI");
        this.addChannel("WINDOW");
      /*  this.getChannel('UI')
            .subscribe(p=>console.log('ui payload ',p));*/
	}

}
