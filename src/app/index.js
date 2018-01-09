import {AppView} from "./app-view";



const css = require("./../scss/main.scss");

import {Spyne} from "spyne";


const spyneApp = new Spyne();

if (Spyne.hasOwnProperty('globals') === false){
    spyneApp['globals'] = {};
    console.log('spyne globals ',spyneApp);
    spyneApp.globals.containsIframe = document.querySelector('iframe') !== null;
}

const R = require("ramda");




const App = new AppView({
    el: document.getElementById('example-app')
});

