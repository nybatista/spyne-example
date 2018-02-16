import {ViewStream} from '../../../../../spynejs/lib/spyne';
import {PagesHolderView} from '../pages/pages-holder-view';
import {AppMenuView} from './app-menu-view';

export class AppView extends ViewStream {

    constructor(props={}){

        super(props);
    }

    addActionMethods() {
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
            this.sendChannelPayload('UI', {pageId:'lala'});
        };

        window.setTimeout(sendPayload, 2000);
    }


    afterRender(){
        this.appendView(new AppMenuView());
        this.appendView(new PagesHolderView());
        this.testSendPayload();

    }




}
