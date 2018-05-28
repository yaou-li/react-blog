import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './common/common.css'
import { Spinner } from './common'
import avatar from './common/img/avatar.jpg'
import { Top, Content } from './view'
// import Button from '@material-ui/core/Button';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topHeight: '50%',
        }
    }

    render() {
        return (
            <div className='App'>
                <Top avatar={avatar} height={this.state.topHeight}/>
                <div className='full-width flex-center justify-center'>
                    <Content />
                </div>
            </div>
        );
    }
}

export default App;
