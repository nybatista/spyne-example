import {AsyncSubject, Subject,Observable} from 'rxjs';
import {filter,fromPromise, tap} from 'rxjs/operators';
import {ChannelsBase, ChannelStreamItem} from 'spyne';

export class ChannelGateway extends ChannelsBase {

  constructor(props = {}) {

    super(props);
    this.props.name = 'CHANNEL_GATEWAY';
    this.observer$ = new Subject();
    this.props.gatekeeperLoginsUrl = "https://logins.spynejs.com/dev/spyne"
    this.props.spyneName = Spyne.config.appName;
    this.props.passwordKey = `${Spyne.config.appName}_GateVal`;

    this.initLocalStorageCheck();


    //this.fetchData();
  }

  addRegisteredActions() {
    return [
      'CHANNEL_GATEWAY_LOCALSTORAGE_DATA_EVENT',
      'CHANNEL_GATEWAY_LOCALSTORAGE_PASSWORD_CORRECT_EVENT',
      'CHANNEL_GATEWAY_LOCALSTORAGE_PASSWORD_INCORRECT_EVENT',
      'CHANNEL_GATEWAY_PASSWORD_CORRECT_EVENT',
      'CHANNEL_GATEWAY_PASSWORD_INCORRECT_EVENT',
      'CHANNEL_GATEWAY__DATA_EVENT',
      'CHANNEL_GATEWAY_CHECK_CREDENTIALS_EVENT'
    ];
  }

  getAction(isLocalStorage, passIsCorrect){
    let type = isLocalStorage === true ? "LOCALSTORAGE_" : "";
    let isCorrect = passIsCorrect ===  true ? "CORRECT_" : "INCORRECT_";
    return `CHANNEL_GATEWAY_${type}PASSWORD_${isCorrect}EVENT`;
  }

  onIncomingObserverableData(obj) {
    let data = obj.observableData;
    let action = data.action;
    //console.log('submit fetch ',{data,action});
    if (action === "CHANNEL_GATEWAY_CHECK_CREDENTIALS_EVENT"){
      let name = this.props.spyneName;
      let pass = data.payload.password;
      //console.log('incoming ',{name, pass});

     this.fetchData(name, pass);
    }
  }

  initLocalStorageCheck(){

    const onLocalStorageGatewayPwdCheck = (item)=>{

      let payload = item.channelPayload;

      let {key,localStorageVal} = payload;
      let isPwdKey = key === this.props.passwordKey;
      if (isPwdKey === true){
        this.fetchData(this.props.spyneName, localStorageVal, true);
      }

    //  console.log('localstorage channel event from get ',{isPwdKey,key,localStorageVal, payload});

    };
    const filterGetEvent = (p)=>p.action === "CHANNEL_LOCALSTORAGE_GET_EVENT";


    this.localStorage$ = this.getChannel('CHANNEL_LOCALSTORAGE');

    this.localStorage$
    .filter(filterGetEvent)
        .subscribe(onLocalStorageGatewayPwdCheck);



  }


  fetchData(spyneName='', pwd='', isLocalStorage=false){

    const url = this.props.gatekeeperLoginsUrl;

    const data = {
      "spyneName" : spyneName,
      "password" : pwd

    };

    const addLocalStorageValMap = (p)=>{
      p['isLocalStorage'] = isLocalStorage;
      p['passwordKey'] =  data.spyneName;
      p['passwordVal'] =  data.password;
    // p.input = {};
      return p;
    };

    const createChannelStreamItem = (payload)=>{
      let action = this.getAction(isLocalStorage, payload.passwordIsValid);
      let name = this.props.name;

      return new ChannelStreamItem(name, action, payload);

    };

    //console.log('channel post data ',data,spyneName,pwd);

    let response$ = Observable.fromPromise(fetch(
        url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        }
    ))
    .flatMap(r => Observable.fromPromise(r.json()))
    .map(addLocalStorageValMap)
    .map(createChannelStreamItem)
        .subscribe(this.onSendFetchEvent.bind(this));
       // .multicast(this.observer$);

   // response$.connect();

  }

  onSendFetchEvent(item){
    this.sendStreamItem(item.action, item.channelPayload);
   // console.log('item onSendFetchEvent is ',item);
  }



  onSendEvent(actionStr, payload = {}) {
    const action = this.channelActions[actionStr];
    const srcElement = {};
    const event = undefined;
    this.sendStreamItem(action, payload, srcElement, event);
  }

}