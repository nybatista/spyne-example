// import Rx from "rxjs";
import {ViewStream} from 'spyne';

export class PageControl extends ViewStream {

  constructor(props = {}) {
    props.id='page-control';
    props.className = 'null-view';
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

  afterRender() {

  }

}
