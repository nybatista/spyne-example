import {ViewStream} from "spynejs";
import {ChannelData500px} from './channels/channel-data-500px';
import {ImageContainerView} from './components/images-component/image-container-view';
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
        this.appendView(new ImageContainerView());


    }




}
