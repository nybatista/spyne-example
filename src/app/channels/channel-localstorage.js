import {Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ChannelsBase, ChannelsStreamItem} from 'spyne';
const R = require('ramda');

export class ChannelLocalStorage extends ChannelsBase {

  constructor(props = {}) {

    super(props);
    this.props.name = 'CHANNEL_LOCALSTORAGE';
    this.props.localStorageKey = `${Spyne.config.appName}_storage`;
    this.observer$ = new Subject();
  }

  addRegisteredActions() {
    return [
      'CHANNEL_LOCALSTORAGE_GET_EVENT',
      'CHANNEL_LOCALSTORAGE_SET_EVENT',
      'CHANNEL_LOCALSTORAGE_UPDATE_EVENT'
    ];
  }

  onIncomingObserverableData(obj) {
    let data = obj.observableData;
    let payload = data.payload;
    let {action,key,val} = payload;
    const hasKey = key!==undefined;
    const hasVal = val!==undefined;
    const isGetAction = action === "CHANNEL_LOCALSTORAGE_GET_EVENT";
    const isSetAction = action === "CHANNEL_LOCALSTORAGE_SET_EVENT";
    const isUpdateAction = action === "CHANNEL_LOCALSTORAGE_UPDATE_EVENT";
    let isTrue = R.equals(true);

    let runGetEvent = R.all(isTrue, [isGetAction,hasKey]);
    let runSetEvent = R.all(isTrue, [isSetAction,hasKey,hasVal]);
    let runUpdateEvent = R.all(isTrue, [isUpdateAction,hasKey,hasVal]);
    let methodStrs = {runGetEvent, runSetEvent, runUpdateEvent};
    let method =  R.compose(R.head, R.keys, R.filter(isTrue))(methodStrs)

    if (method!==undefined){
      let fn = this[method].bind(this);
      fn(payload);
    }
  }
  runGetEvent(obj){
    //console.log('run get event ',obj);
    let {key,val,action} = obj;

    let sItem = this.getStorageItem(key);
    obj['localStorageVal'] =  sItem !== "" ? sItem : undefined;
    obj[key] = obj.localStorageVal;
    this.onSendEvent(obj.action, obj);

  }
  runSetEvent(obj){
    //console.log('run SET event ',obj);
    let {key,val,action} = obj;
    //console.log("KEY VAL OBJ ",{key,val,obj});
    obj['localStorageVal'] = this.setStorageItem(key,val);
    obj[key] = obj.localStorageVal;
    this.onSendEvent(obj.action, obj);

  }
  runUpdateEvent(obj){
    console.log('run update event ',obj);
    this.onSendEvent(obj.action, obj);
  }

  onSendEvent(actionStr, payload = {}) {
    const action = this.channelActions[actionStr];
    const srcElement = {};
    const event = undefined;
    this.sendStreamItem(action, payload, srcElement, event);
  }

  getStorageItem(key="", val="") {
    return localStorage.getItem(key) || this.setStorageItem(val);
  }

  setStorageItem(key="", val = "") {
    localStorage.setItem(key, val);
    return val;
  }


}