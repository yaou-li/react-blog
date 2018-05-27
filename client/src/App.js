import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './common/common.css'
import { Spinner } from './common'
import avatar from './common/img/avatar.jpg'
import { Top } from './view'
// import Button from '@material-ui/core/Button';

class App extends Component {

  render() {
    return (
      <div className='App'>
        <Top avatar={avatar}/>
        <div className='flex-center full-width justify-center' >
            <Spinner height={30} width={30} duration={5}/>
        </div>
      </div>
    );
  }
}

export default App;
