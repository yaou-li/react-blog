import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import showdown from 'showdown';
import './Editor.css';
import { EditableText, Divider } from '../../common';
import { fetchAPI, format, base64Encode, API, storage } from '../../lib'

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            text: '',
            html: ' ',
            title: 'New Blog',
        };
    }

    componentWillMount() {
        fetchAPI({
            url: API.TOKEN,
            success: (data) => {
                if (!data.token) return false;
                storage.set('token', data.token, 24 * 3600);
            },
            error: (data) => {
                window.alert('User Authentication Failed.');
                this.props.history.push('/login');
            }
        });
    }

    componentDidMount() {
        
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
            text: e.currentTarget.value,
            html: html,            
        });
    }

    save() {
        fetchAPI({
            url: !this.state.id ? API.ARTICLE : API.ARTICLE + '/' + this.state.id,
            method: !this.state.id ? 'POST' : 'PUT',
            params: {
                title: this.state.title,
                content: this.state.text
            },
            success: (data) => {
                console.log(data);
                this.setState({
                    id: data.id
                });
                console.log('saved successfully');
            },
        })
    }
    
    render() {
        return (
            <div id="editor">
                <div className="title flex justify-between">
                    <EditableText 
                        defaultText={this.state.title} 
                        onChange={(text) => this.setState({title: text})}
                        width="50%"    
                    />
                    <div className="btn-save" onClick={(e) => this.save(e)}>Save</div>
                </div>
                <Divider />
                <div className="editor">
                    <textarea onChange={(e) => this.onChange(e)}/>
                </div>
                <div className="blog" dangerouslySetInnerHTML={{__html: this.state.html}} />
            </div>
        )
    }
}

export default withRouter(Editor)