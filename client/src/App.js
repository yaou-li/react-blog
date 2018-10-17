import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './common/common.css'
import { Spinner } from './common'
import avatar from './assets/img/avatar.jpg'
import { Top, Content, Navbar } from './view'
// import Button from '@material-ui/core/Button';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topHeight: '100%',
            showNavbar: false,
        }
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    toggleNavbar(type, e) {
        e.stopPropagation();
        this.setState({
            showNavbar: type === 'show',
        });
    }

    render() {
        return (
            <div className='App'>
                <Route path='/' render={(props) => <Top avatar={avatar} height={props.location.pathname === '/' ? this.state.topHeight : '120px'} toggleNavbar={this.toggleNavbar} {...props}/>} />
                <Route path='/' render={(props) => <Navbar show={this.state.showNavbar} toggleNavbar={this.toggleNavbar} {...props}/>} />
                <div className='full-width flex-center justify-center'>
                    <Content />
                </div>
            </div>
        );
    }
}

export default App;
