import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { fetchAPI, format, base64Encode, API, storage } from '../../lib'
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }
    
    handleChange(e) {
        let ob = {};
        ob[e.target.name] = e.target.value;
        this.setState(ob);
    }

    login() {
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + base64Encode(this.state.username + ":" + this.state.password));
        // console.log(storage.get('token'));
        // headers.set('Authorization', 'Basic ' + base64Encode(storage.get('token') + ":fake"));
        // headers.set('Authorization', 'Token ' + storage.get('token'));
        fetchAPI({
            url: API.LOGIN,
            headers: headers,
            success: (data) => {
                if (!data.token) return false;
                window.alert("login successfully");
                storage.set('token', data.token, 24 * 3600);
            },
        });
    }

    render() {
        return (
            <div id='login'>
                <input name='username' type='text' placeholder='username' onChange={(e) => this.handleChange(e)} value={this.state.username} />
                <input name='password' type='password' placeholder='password' onChange={(e) => this.handleChange(e)} value={this.state.password} />
                <div className='btn-submit' onClick={(e) => this.login(e)}>Login</div>
            </div>
        )
    }
}

export default Login