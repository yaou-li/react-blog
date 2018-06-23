import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MenuBar.css'

class MenuBar extends Component {

    render() {
        const style = {
            height: this.props.height + 'px',
            width: this.props.width + 'px'
        };

        return (
            <div className='menu-bar' style={style} ></div>
        );
    }
}

MenuBar.defaultProps = {
    height: 22,
    width: 25
};

MenuBar.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number
};

export default MenuBar