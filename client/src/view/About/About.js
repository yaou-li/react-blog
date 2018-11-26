import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }

    handleChange(editorState) {
        console.log(editorState.getCurrentContent());
        this.setState({editorState});
    }

    _onBoldClick() {
        this.handleChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
      }
    
    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.handleChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }
    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <button onClick={this._onBoldClick.bind(this)}>Bold</button>
                <Editor 
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        )
    }
}

export default About