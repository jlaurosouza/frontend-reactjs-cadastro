import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
    
import  FormEmployee from './pages/employee/Form';
import  Home from './pages/home';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/employees" exact component={FormEmployee} />
                <Route path="/employees/:id" exact component={FormEmployee} />
            </Switch>
        </BrowserRouter>
    )
}