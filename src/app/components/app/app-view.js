import {ViewStream} from 'spyne';
import {PagesHolderView} from '../pages/pages-holder-view';
import {AppMenuView} from './app-menu-view';

export class AppView extends ViewStream {

    constructor(props={}){

        super(props);
    }

    addActionListeners() {
        return [
            ['CHANNEL_ROUTE_*', 'onChannelRouteEvent']
        ];

    }


    broadcastEvents() {
        return [
            ['.nav-btn', 'click'],
            ['.nav-btn-ui', 'click']
        ];
    }

    onChannelRouteEvent(item){
        console.log('route event ',item);
    }


    testSendPayload(){

        let sendPayload = ()=>{
           // this.sendUIPayload(new Rx.Observable.of(''), obj);]
            let obj = {pageId: 'page-one', imageNum: '2', author: 'ubalu'};
            obj = R.omit(['pageId'], obj);
            //obj =  {randomNum:5};
            this.sendChannelPayload('ROUTE', obj);
        };

        //window.setTimeout(sendPayload, 5000);
    }


    afterRender(){


        this.appendView(new AppMenuView());
        this.appendView(new PagesHolderView());
        this.testSendPayload();
        this.addChannel("ROUTE");

        this.getChannel('WINDOW')
            .subscribe((p)=>{
                console.log('window event  ',p.action, p);
        });

        this.getChannel("ChannelData500px")
            .subscribe((p)=>{
                console.log('data ',p);
        });

    }




}
