import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import showdown from 'showdown';
import './Editor.css';
import { EditableText, Divider } from '../../common';
import { fetchAPI, API, DEFAULT_DURATION, storage } from '../../lib';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            content: '',
            html: ' ',
            title: this.props.match.params.blogId ? '' : 'New Blog',
        };
    }

    componentWillMount() {
        fetchAPI({
            url: API.TOKEN,
            success: (data) => {
                if (!data.token) return false;
                storage.set('token', data.token, DEFAULT_DURATION);
            },
            error: (data) => {
                window.alert('User Authentication Failed.');
                this.props.toRoute({
                    path: '/login'
                });
            }
        });
    }

    componentDidMount() {
        //load prev data if blog id is provided
        if (this.props.match.params.blogId) {
            fetchAPI({
                url: API.ARTICLE + '/' + this.props.match.params.blogId,
                success: (data) => {
                    this.setState(data);
                    this.onChange({currentTarget:{
                        value: data.content
                    }});
                }
            });
        }
    }
    
    onChange(e) {
        let converter = new showdown.Converter({
            strikethrough: true,
            tasklists: true,
            backslashEscapesHTMLTags: true,
            ghCodeBlocks: true
        });
        let html = converter.makeHtml(e.currentTarget.value);  
        this.setState({
            content: e.currentTarget.value,
            html: html,            
        });
    }

    save() {
        fetchAPI({
            url: !this.state.id ? API.ARTICLE : API.ARTICLE + '/' + this.state.id,
            method: !this.state.id ? 'POST' : 'PUT',
            params: {
                title: this.state.title,
                content: this.state.content
            },
            success: (data) => {
                this.setState({
                    id: data.id
                });
                this.props.toRoute({
                    path: '/blog'
                });
            },
        });
    }
    
    render() {
        return (
            <div id="editor">
                <div className="title flex justify-between">
                    {   (!this.props.match.params.blogId || this.state.title) &&
                        <EditableText
                            defaultText={this.state.title}
                            onChange={(text) => this.setState({title: text})}
                            width="50%"
                        />
                    }
                    <div className="btn-save" onClick={(e) => this.save(e)}>Save</div>
                </div>
                <Divider />
                <div className="editor">
                    <textarea value={this.state.content} onChange={(e) => this.onChange(e)}/>
                </div>
                <div className="blog" dangerouslySetInnerHTML={{__html: this.state.html}} />
            </div>
        )
    }
}

export default withRouter(Editor)