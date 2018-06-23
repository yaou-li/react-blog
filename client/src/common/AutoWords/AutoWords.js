import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AutoWords.css';

class AutoWords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: -1,
            status: '',
        }
    }

    componentDidMount() {
        this.counter = this.state.counter;
        this.interval = setInterval(() => {
            if (this.counter > this.props.words.length) {
                clearInterval(this.interval);
                this.setState({
                   status: 'waiting'
                });
                setTimeout(() => {
                    this.setState({
                        status: 'finished'
                    });
                },this.props.waiting);
                return false;
            }
            this.counter++;
            this.setState({
                counter: this.counter
            });

        },this.props.interval);
    }

    render() {
        const words = this.props.words.split('').map((word,i) => <em className={'auto-word ' + (i <= this.state.counter ? 'show' : '')} key={i}>{word}</em>);
        const style = {
            color: this.props.color,
            fontSize: this.props.size
        };
        return (
            <div className={"auto-words " + this.state.status} style={style}>
                {words}
            </div>
        )
    }

}

AutoWords.defaultProps = {
    color: '#FFFFFF',
    size: 'inherit',
    interval: 100,
    waiting: 3000
};

AutoWords.propTypes = {
    words: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    interval: PropTypes.number,
    waiting: PropTypes.number,
    callback: PropTypes.func,
};

export default AutoWords;