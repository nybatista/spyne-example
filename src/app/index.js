import {AppView} from "./components/app/app-view";
import {SpyneApp, ViewStream, ChannelsBaseData} from 'spyne';
const R = require('ramda');

const css = require("./../scss/main.scss");


const spyneConfig = {

    channels: {

        WINDOW: {
            mediqQueries: {
                "test" : "screen and (max-width:500px)",
                "newTest" : "screen and (max-width:800px)"
            }
        },

        ROUTE1: {
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


window.onStartApp = function() {


    const spyneApp = new SpyneApp(spyneConfig);
    const reHttps = /^(https:)(.*)$/;
    const mapFn = (data) => {
        const updates = (img) => {
            img.description = img.description === null
                ? 'untitled'
                : img.description;
            img['perpsectiveNum'] = String((img.height / img.width) * 100 +
                "%");
            img['image_url'] = img.urls.small;
            img.user['userpic_url'] = String(img.user.profile_image.large).replace(reHttps, '$2');
            console.log('img is ',img);
            return img;
        };
        data.photos = R.map(updates, data.results);
        return data.photos;
    };
    const pixData = {
        dataUrl: "https://api.unsplash.com/search/photos/?client_id=68f7ee84bd1d1bbcecf2692172b48c28704e2108c23d7d1d9fc7049a7ece12ae&page=1&query=landscape",
        name: 'ChannelData500px',
        map: mapFn
    };

    spyneApp.registerDataChannel(new ChannelsBaseData(pixData));

    const App = new AppView({
        el: document.getElementById('example-app')
    });

    console.log('Spyne: ',Spyne.VERSION);

};

const onPolysLoaded = ()=>{
    if (window.polysAreLoaded === true){
        onStartApp();
    } else {
        window.setTimeout(onPolysLoaded, 100);
    }
};

onStartApp();

