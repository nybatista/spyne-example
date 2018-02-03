// import Rx from "rxjs";
const R = require('ramda');
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
            ['CHANNEL_ROUTE_CHANGE_EVENT', 'onRouteChangeEvent']
        ];
	}

	broadcastEvents() {
		// return nexted array(s)
		return [];
	}

    onRouteChangeEvent(e){
        const routeInfo = e;

        //let newObj = this.getRouteInfoJson(window.location.pathname);

        let pageId = routeInfo.pageId;



        console.log("new route obj  is ",e,' --- ',routeInfo.data.hasOwnProperty('imageNum'));
        if (routeInfo.data.hasOwnProperty('imageNum')===false) {
            this.appendView(new PageView({routeInfo}));
        }
    }


    afterRender() {
        this.addChannel('ROUTE');
	}

}
