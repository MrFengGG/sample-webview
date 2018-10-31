import React from 'react';
import {HashRouter,Route,Switch,Link,Table} from 'react-router-dom'

import Index from '../page/Index/Index'

export default class AppRouter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <HashRouter>
                <div id="wrapper">
                    <Route path="/" component={Index}/>
                </div>
            </HashRouter>
        )
    }
}