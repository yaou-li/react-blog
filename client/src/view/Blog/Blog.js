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
                <Switch>
                    <Route path='/blog' exact render={(props) => <BlogList toRoute={this.props.toRoute} {...props}/>}/>
                    <Route path='/blog/:id' render={(props) => <BlogDetail toRoute={this.props.toRoute} {...props}/>}/>
                </Switch>
            </div>
        )
    }
}

export default Blog;