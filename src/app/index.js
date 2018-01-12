 import {AppView} from "./app-view";




const css = require("./../scss/main.scss");

import {Spynejs, ViewStream} from "spynejs";
 import {ChannelData500px} from './channels/channel-data-500px';


const spyneApp = new Spynejs();

//console.log("SPYNE ",spyneApp);
 spyneApp.registerChannel('ChannelData500px', new ChannelData500px());
/*

if (Spyne.hasOwnProperty('globals') === false){
    spyneApp['globals'] = {};
    console.log('spyne globals ',spyneApp);
    spyneApp.globals.containsIframe = document.querySelector('iframe') !== null;
}
*/

const R = require("ramda");





const App = new AppView({
    el: document.getElementById('example-app')
});


