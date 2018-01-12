import {ViewStream} from "spynejs";
import {PagesHolderView} from './components/pages/pages-holder-view';
import {AppMenuView} from './components/app/app-menu-view';
export class AppView extends ViewStream {

    constructor(props={}){

        super(props);
    }

    addActionMethods() {
        return [
            ['CHANNEL_ROUTE_CHANGE_EVENT', 'onRouteChangeEvent']
        ];

    }


    broadcastEvents() {
        return [
            ['.nav-btn', 'click']
        ];
    }

    onRouteChangeEvent(e){
        console.log(' route event is ',e);
    }



    afterRender(){

        this.addChannel('ROUTE');
        this.appendView(new AppMenuView());
        this.appendView(new PagesHolderView());


    }




}
