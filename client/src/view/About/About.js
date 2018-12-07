import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import showdown from 'showdown';
import "./About.css";

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            html: ' ',
        };
    }

    componentDidMount() {
        
    }
    
    handleChange(e) {
        let converter = new showdown.Converter();
        let html      = converter.makeHtml(e.currentTarget.value);  
        this.setState({
            html: html,            
        });
    }
    
    render() {
        return (
            <div id="about">
                <div className="editor">
                    <textarea onChange={(e) => this.handleChange(e)}/>
                </div>
                <div className="blog" dangerouslySetInnerHTML={{__html: this.state.html}} />
            </div>
        )
    }
}

export default About