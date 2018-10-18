import React, { Component } from 'react';
import './Demo.css';
import { Card } from '../../common';

class CardList extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div className='cardList flex full-width full-height'>
                <Card toRoute={this.props.toRoute} path='/demo/demo1'/>
                <Card toRoute={this.props.toRoute} path='/demo/demo2'/>
            </div>
        )
    }
}

export default CardList;