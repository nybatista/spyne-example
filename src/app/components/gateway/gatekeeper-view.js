// import Rx from "rxjs";
import {ViewStream} from 'spyne';
import 'whatwg-fetch';
const R = require('ramda');


export class GateKeeperView extends ViewStream {

  constructor(props = {}) {
    props.id= 'gatekeeper';
    props.template = require('./templates/gatekeeper.tmpl.html');
    super(props);
    //this.checkForCredentials = GateKeeperView.checkForCredentials.bind(this);
  }

  addActionListeners() {
    // return nexted array(s)
    return [
      ['CHANNEL_GATEWAY_PASSWORD_INCORRECT_EVENT', 'onPasswordIncorrect'],
      ['CHANNEL_GATEWAY_LOCALSTORAGE_PASSWORD_INCORRECT_EVENT', 'onLocalStorageIncorrect'],
      ['CHANNEL_GATEWAY_LOCALSTORAGE_PASSWORD_CORRECT_EVENT', 'onlocalStorageGatewayCompleted'],
      ['CHANNEL_GATEWAY_PASSWORD_CORRECT_EVENT', 'onGatewayCompleted'],
      ['CHANNEL_UI', 'onUIEvent']
    ];
  }
  onUIEvent(item){
    //console.log("UI EVENT ",item);

  }

  onLocalStorageIncorrect(){
    this.props.el$.addClass('show');

  }


  onPasswordIncorrect(item){
    let payload = item.channelPayload;
    //console.log('PASSWORD INCORRECT ',item);
    this.props.errorMsg.addClass('reveal');
  }
  onlocalStorageGatewayCompleted(item){
    this.onDispose();
  }

  onGatewayCompleted(item){
    let correctPassword = R.path(['channelPayload', 'passwordVal'], item);
    //console.log("REMOVE GATEWAY ",correctPassword, item);
    this.checkLocalStorage(correctPassword);
    this.onDispose();
  }

  broadcastEvents() {
    // return nexted array(s)
    return []
  }

  resetForm(){
    this.props.errorMsg.removeClass('reveal');
    this.props.input.value = "";

  }


  onInput(event){
    //console.log('input here ',event);
    //this.showError(false);
    this.resetForm();

  }

  onSubmit(event){

    let val = this.props.input.value;
   // this.runValidator(val, this.showError.bind(this));
   // this.showError(false);
    event.preventDefault();
    //console.log('on submit ',val);
    let password = val;
    let action = 'CHANNEL_GATEWAY_CHECK_CREDENTIALS_EVENT';
    this.props.input.blur();
    this.sendChannelPayload('CHANNEL_GATEWAY', {password,action}, action);

  }

  checkLocalStorage(val=''){
    //this.addChannel('CHANNEL_LOCALSTORAGE');
    let key = `${Spyne.config.appName}_GateVal`;
    this.props.passwordKey = key;
    let action = val !== "" ? 'CHANNEL_LOCALSTORAGE_SET_EVENT' : 'CHANNEL_LOCALSTORAGE_GET_EVENT';
    let localStorageObj = {key,action,val};
    this.sendChannelPayload('CHANNEL_LOCALSTORAGE', localStorageObj, action);

  }

  onBeforeDispose(){
    this.props.btn.removeEventListener('click', this.onSubmit.bind(this), false);
    this.props.input.removeEventListener('focus', this.onInput.bind(this), false);
  }


  afterRender() {

    this.props.spyneName = Spyne.config.appName;

    this.props.btn = this.props.el$.query('#submit').el;
    this.props.input = this.props.el$.query('#password-dw').el;
    this.props.errorMsg = this.props.el$.query("#error-msg");
    //this.props.el$.addClass('show');

    this.props.btn.addEventListener('click', this.onSubmit.bind(this), false);
    this.props.input.addEventListener('focus', this.onInput.bind(this), false);
    //this.props.input.addEventListener('input', this.onInput.bind(this), false);
    this.checkLocalStorage();

    this.addChannel("UI");
    this.addChannel("CHANNEL_GATEWAY");
  }

}