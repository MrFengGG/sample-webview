import React from 'react';
import {HashRouter,Route,Switch,Link} from 'react-router-dom'

import Sider from '../page/index'

export default class AppRouter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <HashRouter>
                <div id="wrapper">
                    <Route path="/" component={Sider}/>
                </div>
            </HashRouter>
        )
    }
}