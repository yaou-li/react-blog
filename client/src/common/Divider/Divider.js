import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Divider.css';

class Divider extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const style = {
            backgroundColor: this.props.bkgColor,
            height: this.props.direction === 'horizontal' ? '1px' : '1em',
            width: this.props.direction === 'horizontal' ? '100%' : '1px',
        }
        this.props.height && (style.height = this.props.height);
        this.props.width && (style.width = this.props.width);

        return (
            <div className='divider' style={style}></div>
        )
    }
}

Divider.defaultProps = {
    bkgColor: '#e8e8e8',
    direction: 'horizontal',
};

Divider.propTypes = {
    bkgColor: PropTypes.string,  
    direction: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string
};

export default Divider;

