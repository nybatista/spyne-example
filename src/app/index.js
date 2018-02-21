
import {AppView} from "./components/app/app-view";
import {Spyne, ViewStream} from 'spynejs';
import {ChannelData500px} from './channels/channel-data-500px';

const css = require("./../scss/main.scss");


const spyneConfig = {

    channels: {

        DOM: {
            mediqQueries: {
                "test" : "(max-width: 500px)",
                "newTest" : "(max-width: 800px)"
            },
            listenForResize: true,
            listenForOrientation: true,
            listenForScroll: true,
            listenForMouseWheel: false,
            debounceMSTimeForResize: 200,
            debounceMSTimeForScroll: 150
        },

        ROUTE: {
            type: 'query', /* "slash", "query" */
            isHash: true,
            isHidden: false,
            routes: {
                'route': {
                    'param': 'pageId',
                    'home': '',
                    'page-one': {
                        'route': {
                            'param': 'imageNum',
                            'route': {
                                'param': 'author'
                            },
                        },
                    },
                    'page-two': {
                        'route': {
                            'param': 'photogNum'
                        },
                    },
                    'page-.*' : {
                        'route': {
                            'param': 'randomNum'
                        }
                    }
                },

            },

        },
    },

};

console.log("CHANNEL CONFIG ",spyneConfig);



const spyneApp = new Spyne(spyneConfig);
spyneApp.registerChannel('ChannelData500px', new ChannelData500px());

const App = new AppView({
    el: document.getElementById('example-app')
});

const Rx = require('rxjs');
const R = require("ramda");
window.R = R;
window.Rx = Rx;
