import {AsyncSubject, Observable, from} from "rxjs";
import {flatMap, map, multicast} from 'rxjs/operators';
const R = require('ramda');
import {ChannelsBase, ChannelStreamItem} from 'spyne';
import 'whatwg-fetch';


export class ChannelData500px extends ChannelsBase {
    constructor(props={}){
        //props.dataUrl = "https://api.unsplash.com/search/photos/?client_id=68f7ee84bd1d1bbcecf2692172b48c28704e2108c23d7d1d9fc7049a7ece12ae&page=1&query=landscape";
        //props.dataUrl = "https://api.500px.com/v1/photos/search?term=10&exclude=people&consumer_key=XbScUOttPINmCIoKkeXhRmdBWCM5Nqf0LNZ9Siiv&image_size=5";
        super(props);
        this.props.name = 'ChannelData500px';
        //this.dataUrl="https://api.500px.com/v1/photos/search?term=abstract&consumer_key=XbScUOttPINmCIoKkeXhRmdBWCM5Nqf0LNZ9Siiv&image_size=5";
        //this.dataUrl="https://api.500px.com/v1/photos/search?term=10&exclude=people&consumer_key=XbScUOttPINmCIoKkeXhRmdBWCM5Nqf0LNZ9Siiv&image_size=5";
        //this.dataUrl='https://api.500px.com/v1/photos/search?term=10&exclude=0,7,21&consumer_key=XbScUOttPINmCIoKkeXhRmdBWCM5Nqf0LNZ9Siiv&image_size=5';
       //this.dataUrl='https://api.500px.com/v1/photos/search?term=10&exclude=Uncategorized,People,Street&consumer_key=XbScUOttPINmCIoKkeXhRmdBWCM5Nqf0LNZ9Siiv&image_size=5';
       // this.props.dataUrl='https://api.500px.com/v1/photos/search?term=Popular&exclude=Uncategorized,People,Street&consumer_key=XbScUOttPINmCIoKkeXhRmdBWCM5Nqf0LNZ9Siiv&image_size=5';
        //this.dataUrl='https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=19516ad1b5024ca29b3390ca81d4980f&text=nature&safe_search=1&format=json&nojsoncallback=1';
        //this.dataUrl = getAssetsObj('data/','data.json');
        this.observer$ = new AsyncSubject();
        this.fetchData();



    }

    addRegisteredActions() {
        return [
            'CHANNEL_DATA_EVENT',
        ]
    }

    fetchData(){

        const mapData = (data)=>{
            const reHttps = /^(https:)(.*)$/;

            const createSentence = (str)=>{
                let re = /(\w)(.*)/gm;
                let fn = (src, $1, $2) =>{
                    return String($1.toUpperCase())+$2+".";
                };
                return str.replace(re, fn);
            };

            const updates = (img) => {
                img.description = img.description === null
                    ? 'untitled'
                    : img.description;
                img.description = createSentence(img.description);
                console.log(img.description);
                img['perpsectiveNum'] = String((img.height / img.width) * 100 +
                    "%");
                img['image_url'] = img.urls.small;
                img.user['userpic_url'] = String(img.user.profile_image.large).replace(reHttps, '$2');
                //console.log('img is ',img);
                return img;
            };
            console.log("DATA IS ",data);
            data.photos = R.map(updates, data.results);

            return data.photos;

        };

        const createChannelStreamItem = (payload)=>{
            let action = 'CHANNEL_DATA_EVENT';
            return new ChannelStreamItem(this.props.name, action, payload);
        };


        let response$ = from(fetch(this.props.dataUrl))
        .pipe(
        flatMap(r => Observable.fromPromise(r.json())),
        map(mapData),
        map(createChannelStreamItem),
        multicast(this.observer$)
        // .do((p)=>console.log('rxjs jsoin ',p))
        );

        response$.connect();



    }





}
