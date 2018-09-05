import {Subject, Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ChannelsBase, ChannelStreamItem} from 'spyne';
const R = require('ramda');

export class ChannelVideo extends ChannelsBase {

  constructor(props = {}) {

    super(props);
    this.props.name = 'CHANNEL_VIDEO';
    this.observer$ = new Subject();
  }

  addRegisteredActions() {
      return [
          'CHANNEL_VIDEO_INITIALIZED_EVENT',
          'CHANNEL_VIDEO_SYNC_EVENT',
          'CHANNEL_VIDEO_PROGRESS_EVENT',
          'CHANNEL_VIDEO_NEW_VIDEO_EVENT',
          'CHANNEL_VIDEO_COMPLETE_EVENT',
          'CHANNEL_VIDEO_FREEWHEEL_STARTED_EVENT',
          'CHANNEL_VIDEO_FREEWHEEL_ENDED_EVENT'
      ]
  }

    initVideoEvents(item){
        this.videoEl = item.video;


        let onVidUpdate = (p)=>{
            let target = p.target;
            let time = target.currentTime;
            let isPlaying = target.paused === false;
            let dataSet = target.dataset;
            let duration = target.duration;
            let pct = Number(time/duration).toFixed(2)*1;
            let isQuarter = pct*100 % 25 === 0;
            let label = '';

            let thresholdArr = [1,7,13,20,25,30,35,39,44,50];
            let thresholdNum = Math.floor(time);

            let isElapsed15 = thresholdNum % 15 === 0 && thresholdNum !== 0;

            let isThreshold = R.contains(thresholdNum, thresholdArr);
            let start = pct === 0;
            let isComplete = pct === 1;

            if (isThreshold === true){
                label = "#img-"+R.indexOf(thresholdNum, thresholdArr);
            }
           // let obj = {duration,time, pct, isThreshold, thresholdNum, isQuarter,vimeoId,target,isElapsed15};
            //let label = getLabel(obj);
          //  obj['label']=  label;

           /* if (pct===0 && label!=='start'){
              //  isQuarter = false;
            }*/
            //console.log({isThreshold,thresholdNum,label })
            //console.log('p is i',isThreshold,dataSet,{label,duration,time, pct, isQuarter,vimeoId, category, categoryNum,target});

            return {target, label, time,isPlaying,dataSet,duration,pct,isQuarter,isElapsed15,isThreshold, start, isComplete};


        };

        let filterEmptyLabels = (p)=>p.label!=="";
        let distinctLabels = (a,b) => a.label === b.label;


        let vidStr$ = new Observable.fromEvent(this.videoEl,'timeupdate')

        vidStr$
            .map(onVidUpdate)
            .distinctUntilChanged(distinctLabels)
            .filter(filterEmptyLabels)
            .subscribe(this.onSendVideoEvent.bind(this));


    }

    onSendVideoEvent(data){
        let action = this.channelActions['CHANNEL_VIDEO_SYNC_EVENT'];
        let payload = data;
        let srcElement = {};
        let event = {};
        console.log('time update in event ',payload.label, payload.isThreshold,{action, payload, srcElement, event})

        this.sendStreamItem(action, payload, srcElement, event);




    }



   onIncomingObserverableData(obj) {
      let data = obj.observableData;
      let actionStr = R.path(['payload','action'], data);
      let action = this.channelActions[actionStr];
      //console.log("video PAYLOAD ",{action,data,obj})

      if (action!==undefined){
          let payload = data.payload;
          let srcElement = data.srcElement;
          let event = {};
          let sender = x =>  this.observer$.next(channelStreamItem);
          // console.log('obj in channel scene ',obj);
          //console.log("VID CHANNEL ACTION ",action);
          if (action === 'CHANNEL_VIDEO_INITIALIZED_EVENT'){
              this.initVideoEvents(data.payload);
          }

          //let channelStreamItem = new ChannelStreamItem(this.props.name, action, payload, srcElement, event);

          //  window.setTimeout(sender,7500);


          this.sendStreamItem(action, payload, srcElement, event);

          // console.log('channel stream item ',channelStreamItem);
      } else {
          console.warn('not a valid video channel action');
      }

      //console.log('action is ',obj,this.observer$);

  }

  onSendEvent(actionStr, payload = {}) {
    const action = this.channelActions[actionStr];
    const srcElement = {};
    const event = undefined;
    this.sendStreamItem(action, payload, srcElement, event);
  }

}
