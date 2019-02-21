import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import showdown from 'showdown';
import './Editor.css';
import { EditableText, Divider } from '../../common';
import { fetchAPI, HOST, API, DEFAULT_DURATION, storage } from '../../lib';
import { saveImage } from '../../lib/image';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            content: '',
            html: ' ',
            title: this.props.match.params.blogId ? '' : 'New Blog',
            imgMap: {},
        };
        this.converter = new showdown.Converter({
            strikethrough: true,
            tasklists: true,
            backslashEscapesHTMLTags: true,
            ghCodeBlocks: true
        });
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
        let html = this.converter.makeHtml(e.currentTarget.value);  
        this.setState({
            content: e.currentTarget.value,
            html: html,            
        });
    }

    onImageAdd(e) {
        let index = 0,
            fr = new FileReader(),
            imgMap = this.state.imgMap,
            files = [],
            /**
             * data object is different base on event type
             * 'drop' => dataTransfer
             * 'paste' => clipboardData (extends from dataTransfer)
             */
            fileList = e.type == 'paste' ? e.clipboardData.files : e.dataTransfer.files,
            items = e.type == 'paste' ? e.clipboardData.items : e.dataTransfer.items;

        if (fileList.length > 0) {
            // prevent default copy file text info
            e.preventDefault();
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.match('^image/')) {
                    files.push(items[i].getAsFile());
                }
            }
            this.readImages(fr, imgMap, files, index);
        }
    }

    readImages(fr, imgMap, items, index) {
        if (index >= items.length) {
            this.setState({
                imgMap: imgMap
            });
            return false;
        }
        saveImage(items[index], (data) => {
            let placeholder = `IMAGE-${Object.keys(imgMap).length}`;
            imgMap[placeholder] = items[index];
            let content = this.state.content ? `${this.state.content}  \n![${placeholder}](${HOST + data.url})` : `![${placeholder}](${HOST + data.url})`;
            this.setState({
                content: content,
                html: this.converter.makeHtml(content)
            }, () => {
                this.readImages(fr, imgMap, items, index+1);
            });
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
                <div className="editor" onPaste={(e) => this.onImageAdd(e)} onDrop={(e) => this.onImageAdd(e)}>
                    <textarea value={this.state.content} onChange={(e) => this.onChange(e)} />
                </div>
                <div className="blog" dangerouslySetInnerHTML={{__html: this.state.html}} />
            </div>
        )
    }
}

export default withRouter(Editor)