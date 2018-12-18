import {Subject} from "rxjs";
//const R = require('ramda');
import {ChannelsBase, ChannelStreamItem} from 'spyne';


export class ChannelExample extends ChannelsBase {
    constructor(props={}){
        props.name = 'CHANNEL_EXAMPLE';

        super(props);
       // this.onSpyneExampleLoaded = this.onSpyneExampleLoaded.bind(this);

        this.observer$ = new Subject();

        console.log("SPYNE EXAMPLE LOADED ");


    }

    addRegisteredActions() {
        return [
            'CHANNEL_EXAMPLE_EVENT',
            'CHANNEL_EXAMPLE_PAYLOAD_RECEIVED_EVENT',
            ['CHANNEL_EXAMPLE_PAYLOAD_RECEIVED2_EVENT', 'onSpyneExampleLoaded']
        ]
    }

    onSpyneExampleLoaded(obj){
        console.log("SPYNE AUTO LISTENED TO RETURNED PAYLOAD  ",obj);
    }

    onIncomingObserverableData(obj) {
            console.log("ON INCOMING OBSERVABLE FOR EXAMPLE",obj);
    }

}
