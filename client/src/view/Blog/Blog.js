import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import BlogList from './BlogList';
import BlogDetail from './BlogDetail';
import './Blog.css';


class Blog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='blog'>
                <div className='title'>Blog</div>
                <Switch>
                    <Route path='/blog' exact render={(props) => <BlogList toRoute={this.props.toRoute} {...props}/>}/>
                    <Route path='/blog/:demoid' render={(props) => <BlogDetail {...props}/>}/>
                </Switch>
            </div>
        )
    }
}

export default Blog;