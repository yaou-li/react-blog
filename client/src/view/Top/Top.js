import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../common/common.css'
import { MenuBar } from '../../common'
import './Top.css';
import particleConf from './particle.conf'

class Top extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.particlesJS('particles',particleConf);
    }

    render() {
        const style = {
            height: this.props.height,
            background: this.props.bkg
        };
        const avatarStyle = {
            height: this.props.avatarHeight,
            width: this.props.avatarWidth,
            borderRadius: '50%'
        };
        return (
            <div id='particles' className='top-wrap full-width full-height' style={style}>
                <div className='padding-40'>
                    <MenuBar/>
                </div>
                <div id='top'>
                    <div className='flex-center justify-center'>
                        <img src={this.props.avatar} style={avatarStyle}/>
                    </div>
                    <h2 id='title'>李亚欧</h2>
                    <p id='subtitle'>一名努力成为全栈的前端开发</p>
                </div>
            </div>
        )
    }

}

Top.defaultProps = {
    height: '40%',
    // bkg: 'linear-gradient(to right, #45372c 0, #604f43 50%, #364746 50%, #201c19 100%)',
    bkg: 'linear-gradient(to right, #364746 0, #201c19 100%)',
    avatar: '',
    avatarWidth: '120px',
    avatarHeight: '120px',
};

Top.propTypes = {
    bkg: PropTypes.string,
    height: PropTypes.string,
    avatar: PropTypes.string,
    avatarWidth: PropTypes.string,
    avatarHeight: PropTypes.string,
    name: PropTypes.string
};

export default Top;