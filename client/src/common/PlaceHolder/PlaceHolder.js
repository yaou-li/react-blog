import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PlaceHolder.css';

class PlaceHolder extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const style = {
            backgroundColor: this.props.bkgColor,
            height: this.props.height
        }
        return (
            <div className='placeholder' style={style}></div>
        )
    }
}

PlaceHolder.defaultProps = {
    bkgColor: 'rgba(0,0,0,0)',
    height: '1px'
};

PlaceHolder.propTypes = {
    bkgColor: PropTypes.string,  
    height: PropTypes.string,
};

export default PlaceHolder;

