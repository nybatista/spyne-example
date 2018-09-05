// import Rx from "rxjs";
import {ViewStream} from 'spyne';

export class AudioPlayer extends ViewStream {

  constructor(props = {}) {
      props.id='audio-player';
      props.template = require("./templates/audio-player.tmpl.html");
    super(props);

  }

  addActionListeners() {
    // return nexted array(s)
    return [];
  }

  broadcastEvents() {
    // return nexted array(s)
    return [];
  }

  onTimeUpdate(e){
      console.log('time update is ',e.target.currentTime);
  }

  afterRender() {
      this.props.player = this.props.el$.query('audio').el;
     // this.props.player.addEventListener('timeupdate', this.onTimeUpdate.bind(this), false);
      let action = "CHANNEL_VIDEO_INITIALIZED_EVENT";
      let obj =  {
          action,
          video: this.props.player,
      };

      this.sendChannelPayload('CHANNEL_VIDEO', obj, action);
  }

}
