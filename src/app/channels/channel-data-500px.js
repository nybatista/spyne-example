import Rx from "rxjs";
//const R = require('ramda');
import {ChannelsBase, ChannelStreamItem} from 'spynejs';
import 'whatwg-fetch';


export class ChannelData500px extends ChannelsBase {
    constructor(props={}){
        props.dataUrl = "https://api.500px.com/v1/photos/search?term=10&exclude=people&consumer_key=XbScUOttPINmCIoKkeXhRmdBWCM5Nqf0LNZ9Siiv&image_size=5";
        super(props);
        this.props.name = 'ChannelData500px';
        //this.dataUrl="https://api.500px.com/v1/photos/search?term=abstract&consumer_key=XbScUOttPINmCIoKkeXhRmdBWCM5Nqf0LNZ9Siiv&image_size=5";
        //this.dataUrl="https://api.500px.com/v1/photos/search?term=10&exclude=people&consumer_key=XbScUOttPINmCIoKkeXhRmdBWCM5Nqf0LNZ9Siiv&image_size=5";
        //this.dataUrl='https://api.500px.com/v1/photos/search?term=10&exclude=0,7,21&consumer_key=XbScUOttPINmCIoKkeXhRmdBWCM5Nqf0LNZ9Siiv&image_size=5';
       //this.dataUrl='https://api.500px.com/v1/photos/search?term=10&exclude=Uncategorized,People,Street&consumer_key=XbScUOttPINmCIoKkeXhRmdBWCM5Nqf0LNZ9Siiv&image_size=5';
       // this.props.dataUrl='https://api.500px.com/v1/photos/search?term=Popular&exclude=Uncategorized,People,Street&consumer_key=XbScUOttPINmCIoKkeXhRmdBWCM5Nqf0LNZ9Siiv&image_size=5';
        //this.dataUrl='https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=19516ad1b5024ca29b3390ca81d4980f&text=nature&safe_search=1&format=json&nojsoncallback=1';
        //this.dataUrl = getAssetsObj('data/','data.json');
        this.observer$ = new Rx.AsyncSubject();
        this.fetchData();



    }

    getRegisteredActionsArr() {
        return [
            'CHANNEL_DATA_EVENT',
        ]
    }

    fetchData(){

        const mapData = (data)=>{
            const updates  = (img)=> {
                img.description = img.description === null
                    ? img.name
                    : img.description;
                img['perpsectiveNum'] = String((img.height / img.width)*100+"%");

                return img;
            };

            data.photos = R.map(updates, data.photos);

            return data.photos;

        };

        const createChannelStreamItem = (payload)=>{
            let action = 'CHANNEL_DATA_EVENT';
            return new ChannelStreamItem(this.props.name, action, payload);
        };


        let response$ = Rx.Observable.fromPromise(fetch(this.props.dataUrl))
        .flatMap(r => Rx.Observable.fromPromise(r.json()))
        .map(mapData)
        .map(createChannelStreamItem)
        // .do((p)=>console.log('rxjs jsoin ',p))
        .multicast(this.observer$);

        response$.connect();



    }





}
