import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Divider, PlaceHolder } from '../../common';
import showdown from 'showdown';
import './Blog.css';
import { isLoggedIn, fetchAPI, API } from '../../lib';


class BlogDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: '',
            content: '',
        }
        console.log(props);
    }

    componentWillMount() {
        fetchAPI({
            url: API.ARTICLE + '/' + this.props.match.params.id,
            success: (data) => {
                if (data) {
                    this.setState(data)
                }
            },
        });
    }

    createMarkup() {
        let converter = new showdown.Converter({
            strikethrough: true,
            tasklists: true,
            backslashEscapesHTMLTags: true,
            ghCodeBlocks: true
        });
        let html      = converter.makeHtml(this.state.content);  
        return {__html: html};
    }

    render() {
        return (
            <div className="detail">
                {   this.state.title &&
                    <div className="title">{ this.state.title }</div>
                }
                {   this.state.desc &&
                    <div className="desc">{ this.state.desc }</div>
                }
                {   this.state.content &&
                    <div className="content">
                        <div dangerouslySetInnerHTML={ this.createMarkup() } />
                    </div>
                }
                {   isLoggedIn() &&
                    <div className="btn btn-new" onClick={(e) => this.props.toRoute({path: '/editor/' + this.props.match.params.id })}>
                        <i className="fas fa-pencil-alt"></i>
                    </div>
                }
            </div>
        )
    }
}

export default BlogDetail;