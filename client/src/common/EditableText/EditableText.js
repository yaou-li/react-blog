import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './EditableText.css';

class EditableText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            ref: React.createRef(),
            text: this.props.defaultText,
            backup: this.props.defaultText,
        };
    }

    onFocus() {
        this.setState({
            editing: true
        }, () => {
            this.state.ref.current.focus();
        });
        return this;
    }
    
    onBlur() {
        if (!this.state.text) {
            this.setState({
                text: this.state.backup
            });
        } else {
            this.setState({
                backup: this.state.text
            });
        }
        this.setState({editing: false});
        return this;
    }

    onChange(e) {
        // TODO: escape special characters
        this.setState({
            text: e.currentTarget.value
        }, () => {
            this.state.text && this.props.onChange(this.state.text)
        });
        return this;
    }

    onKeyDown(e) {
        if (e.which == 13) {
            this.state.ref.current.blur();
        }
    }

    render() {
        const style = {
            padding: this.props.padding,
            width: this.props.width,
            maxWidth: this.props.width,
        }
        return !this.state.editing ? 
        <div className="editable-text" style={style} onClick={(e) => this.onFocus(e)}>{this.state.text}</div> 
        : 
        <div className="editable-text" style={style} >
            <input 
                ref={this.state.ref}
                type="text" 
                value={this.state.text} 
                onChange={(e) => this.onChange(e)}
                onBlur={(e) => this.onBlur()}
                onKeyDown={(e) => this.onKeyDown(e)}
            />
        </div>
    }
}

EditableText.defaultProps = {
    defaultText: '',
    onChange: void(0),
    padding: '10px',
    width: '200px'
};

EditableText.propTypes = {
    defaultText: PropTypes.string,  
    onChange: PropTypes.func,
    padding: PropTypes.string,
    width: PropTypes.string
};

export default EditableText;