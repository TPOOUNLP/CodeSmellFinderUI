import React from 'react';
import { render } from 'react-dom';
import { Router, Switch, Route , Redirect} from "react-router-dom";
import Detail from "./component/Detail";
import Home from './component/Home';
import history from './component/History';

const Root = () =>
    <Router history={history}>
        <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/detail'  exact component={Detail} />
        <Route render={() => <Redirect to="/"/>}/>
        </Switch>
    </Router>

render(<Root />, document.getElementById('root'));