import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../common/common.css'
import './Top.css';

class Top extends Component {
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
            <div className='top-wrap' style={style}>
                <div id='top'>
                    <div className='icon'>

                    </div>
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
    bkg: 'linear-gradient(to right, #333 0, #333 50%, #eee 100%)',
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