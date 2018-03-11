import {ViewStream} from '../../../../../spynejs/lib/spyne';
import {PagesHolderView} from '../pages/pages-holder-view';
import {AppMenuView} from './app-menu-view';

export class AppView extends ViewStream {

    constructor(props={}){

        super(props);
    }

    addActionListeners() {
        return [
        ];

    }


    broadcastEvents() {
        return [
            ['.nav-btn', 'click'],
            ['.nav-btn-ui', 'click']
        ];
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

        this.getChannel('WINDOW')
            .subscribe((p)=>{
                console.log('window event 1 ',p);
        });

        this.getChannel("ChannelData500px")
            .subscribe((p)=>{
                console.log('data ',p);
        });

    }




}
