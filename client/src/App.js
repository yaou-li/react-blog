import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './common/common.css';
import { Spinner } from './common';
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
        this.toRoute = this.toRoute.bind(this);
    }

    toggleNavbar(type, e) {
        e.stopPropagation();
        this.setState({
            showNavbar: type === 'show',
        });
    }

    toRoute(options, e) {
        const location = {
            pathname: options.path,
        };
        this.props.history.push(location);
    }

    render() {
        return (
            <div className='App'>
                <Route path='/' render={(props) => <Top avatar={avatar} height={props.location.pathname === '/' ? this.state.topHeight : '60px'} tH="60px" toggleNavbar={this.toggleNavbar} {...props}/>} />
                <Route path='/' render={(props) => <Navbar toRoute={this.toRoute} show={this.state.showNavbar} toggleNavbar={this.toggleNavbar} {...props}/>} />
                <Route path='/:module' render={(props) => <Content toRoute={this.toRoute} {...props}/>} />
            </div>
        );
    }
}

export default withRouter(App);
