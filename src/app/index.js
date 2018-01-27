
import {AppView} from "./app-view";
import {Spyne, ViewStream} from 'spynejs';
import {ChannelData500px} from './channels/channel-data-500px';

const css = require("./../scss/main.scss");
const spyneApp = new Spyne();
spyneApp.registerChannel('ChannelData500px', new ChannelData500px());

const App = new AppView({
    el: document.getElementById('example-app')
});



