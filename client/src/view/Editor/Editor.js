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
    
    handleChange(e) {
        let converter = new showdown.Converter({
            strikethrough: true,
            tasklists: true,
            backslashEscapesHTMLTags: true,
            ghCodeBlocks: true
        });
        let html = converter.makeHtml(e.currentTarget.value);  
        this.setState({
            html: html,            
        });
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
                    <div className="btn-save">Save</div>
                </div>
                <Divider />
                <div className="editor">
                    <textarea onChange={(e) => this.handleChange(e)}/>
                </div>
                <div className="blog" dangerouslySetInnerHTML={{__html: this.state.html}} />
            </div>
        )
    }
}

export default withRouter(Editor)