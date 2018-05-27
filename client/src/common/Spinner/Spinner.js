import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Spinner.css';

class Spinner extends Component {
    render() {
        const style = {
            borderTop: '16px solid ' + this.props.color,
            height: this.props.height + 'px',
            width: this.props.width + 'px',
            borderWidth: this.props.width / 5 + 'px',
            animationDuration: this.props.duration + 's'
        };
        return (
            <div className="spinner" style={style}></div>
        )
    }

}

Spinner.defaultProps = {
    color: '#3498db',
    height: 120,
    width: 120,
    duration: 2
};

Spinner.propTypes = {
    color: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    duration: PropTypes.number

};

export default Spinner;