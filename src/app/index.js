console.log('loaded');


import {AppView} from "./components/app/app-view";
import {SpyneApp, ViewStream, ChannelsBaseData} from 'spyne';
//import {ChannelData500px} from './channels/channel-data-500px';
require('es6-promise').polyfill();

const css = require("./../scss/main.scss");



const spyneConfig = {

    channels: {

        WINDOW: {
            mediqQueries: {
                "test" : "screen and (max-width:500px)",
                "newTest" : "screen and (max-width:800px)"
            }
        },

        ROUTE: {
            type: 'slash',
            isHash: false,
            isHidden: false,
            routes: {
                'route': {
                    'keyword': 'pageId',
                    'home': '',
                    'images': {
                        'route': {
                            'keyword': 'imageNum',
                            'route': {
                                'keyword': 'author'
                            },
                        },
                    },
                    'photographers': {
                        'route': {
                            'keyword': 'photogNum'
                        },
                    },
                    'page-.*' : {
                        'route': {
                            'keyword': 'randomNum'
                        }
                    }
                },

            },

        },
    },

};

//console.log("CHANNEL CONFIG ",spyneConfig);

window.onStartApp = function() {

    console.log('polys are loaded');

    const spyneApp = new SpyneApp(spyneConfig);
    const mapFn = (data) => {
        const updates = (img) => {
            img.description = img.description === null
                ? img.name
                : img.description;
            img['perpsectiveNum'] = String((img.height / img.width) * 100 +
                "%");
            return img;
        };
        data.photos = R.map(updates, data.photos);
        return data.photos;
    };
    const pixData = {
        dataUrl: "https://api.500px.com/v1/photos/search?term=10&exclude=people&consumer_key=XbScUOttPINmCIoKkeXhRmdBWCM5Nqf0LNZ9Siiv&image_size=5",
        name: 'ChannelData500px',
        map: mapFn
    };

//spyneApp.registerChannel('ChannelData500px', new ChannelData500px());
    spyneApp.registerDataChannel(new ChannelsBaseData(pixData));

    const App = new AppView({
        el: document.getElementById('example-app')
    });

    const Rx = require('rxjs');
    const R = require("ramda");
    window.R = R;
    window.Rx = Rx;

}

const onPolysLoaded = ()=>{
    if (window.polysAreLoaded === true){
        onStartApp();
    } else {
        window.setTimeout(onPolysLoaded, 100);
    }
};
onPolysLoaded();


