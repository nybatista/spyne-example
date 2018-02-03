
import {AppView} from "./components/app/app-view";
import {Spyne, ViewStream} from 'spynejs';
import {ChannelData500px} from './channels/channel-data-500px';

const css = require("./../scss/main.scss");
let spyneConfig = {

   channels: {
       ROUTE: {
           type: "slash", /* "slash", "hash", "params" */
           routes: {
               "route": {
                   "param": "pageId",
                   "map": {
                       "page-one": {
                           "map": "images",
                           "route": {
                               "param": "imageNum"
                           }
                       },
                       "page-two": {
                           "map": "photogs",
                           "route": {
                               "param": "photogNum"
                           }
                       }
                   }
               }
           }

       }
   }

};


console.log("CHANNEL CONFIG ",spyneConfig);



const spyneApp = new Spyne(spyneConfig);
spyneApp.registerChannel('ChannelData500px', new ChannelData500px());

const App = new AppView({
    el: document.getElementById('example-app')
});


const R = require("ramda");
window.R = R;
