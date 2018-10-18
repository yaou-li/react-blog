import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './Demo.css';
import CardList from './CardList';
import DemoDetail from './DemoDetail';


class Demo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='demo'>
                <div className='title'>Demo</div>
                <Switch>
                    <Route path='/demo' render={(props) => <CardList toRoute={this.props.toRoute} {...props}/>}/>
                    <Route path='/demo/:demoid' render={(props) => <DemoDetail {...props}/>}/>
                </Switch>
            </div>
        )
    }
}

export default Demo;