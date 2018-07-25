import React, { Component } from 'react';
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
    }

    toggleNavbar() {
        this.setState({
            showNavbar: !this.state.showNavbar,
        });
    }

    render() {
        return (
            <div className='App'>
                <Top avatar={avatar} height={this.state.topHeight} toggleNavbar={this.toggleNavbar.bind(this)}/>
                <Navbar show={this.showNavbar} />
                {/*<div className='full-width flex-center justify-center'>*/}
                    {/*<Content />*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default App;
