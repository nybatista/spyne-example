import {ViewStream} from '../../../../../spynejs/lib/spyne';
import {PagesHolderView} from '../pages/pages-holder-view';
import {AppMenuView} from './app-menu-view';

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
