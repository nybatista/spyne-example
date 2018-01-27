import {ViewStream} from 'spynejs';
import {PagesHolderView} from './components/pages/pages-holder-view';
import {AppMenuView} from './components/app/app-menu-view';
export class AppView extends ViewStream {

    constructor(props={}){

        super(props);
    }

    addActionMethods() {
        return [
        ];

    }


    broadcastEvents() {
        return [
            ['.nav-btn', 'click']
        ];
    }




    afterRender(){

        this.appendView(new AppMenuView());
        this.appendView(new PagesHolderView());


    }




}
