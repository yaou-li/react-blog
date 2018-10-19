import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../common/common.css';
import './Navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    componentDidUpdate(prevProps,prevState) {
        
    }

    onTouchEvent(type, e) {
        switch(type) {
            case 'touchstart':             
                if (e.currentTarget.className.indexOf('touch') < 0) {
                    e.currentTarget.className += ' touch';
                }
                break;
            case 'touchend':
                e.currentTarget.className = 'nav-list-item';
                break;
        }
    }

    onClick(path, e) {
        this.props.toRoute({
            path: path
        }, e);
        this.props.toggleNavbar('hide', e);
    }

    render() {
        let className = this.props.show ? 'show' : '';
        return (
            <div id="nav-bar" className={className}>
                <div className='nav-list'>
                    <div className='nav-list-item' onClick={(e) => this.onClick('/', e)} onTouchStart={(e) => this.onTouchEvent('touchstart', e)} onTouchEnd={(e) => this.onTouchEvent('touchend', e)}>Home</div>
                    <div className='nav-list-item' onClick={(e) => this.onClick('/demo', e)} onTouchStart={(e) => this.onTouchEvent('touchstart', e)} onTouchEnd={(e) => this.onTouchEvent('touchend', e)}>Demo</div>
                    <div className='nav-list-item' onClick={(e) => this.onClick('/blog', e)} onTouchStart={(e) => this.onTouchEvent('touchstart', e)} onTouchEnd={(e) => this.onTouchEvent('touchend', e)}>Blog</div>
                    <div className='nav-list-item' onClick={(e) => this.onClick('/about', e)} onTouchStart={(e) => this.onTouchEvent('touchstart', e)} onTouchEnd={(e) => this.onTouchEvent('touchend', e)}>About</div>
                </div>
            </div>
        )
    }

}

Navbar.defaultProps = {
    show: false
};

Navbar.propTypes = {
    show: PropTypes.bool,
    toggleNavbar: PropTypes.func,
};

export default Navbar;