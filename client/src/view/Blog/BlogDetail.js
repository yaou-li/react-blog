import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './Blog.css';


class BlogDetail extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div id='blog'>
                <div className='title'>detail</div>
            </div>
        )
    }
}

export default BlogDetail;