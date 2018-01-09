import {ViewStream} from "spyne";
export class AppView extends ViewStream {

    constructor(props={}){

        super(props);
    }


    afterRender(){


        this.props.el.textContent='example app';

    }




}
