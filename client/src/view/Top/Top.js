import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../common/common.css';
import { MenuBar,AutoWords } from '../../common';
import './Top.css';
import particleConf from './particle.conf';

class Top extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: 'hide'
        };
    }

    componentDidMount() {
        window.particlesJS('particles',particleConf);
    }

    showSearch() {
        this.setState({
            hide: '',
        });
    }

    render() {
        const style = {
            height: this.props.height,
            background: this.props.bkg
        };
        const avatarStyle = {
            height: this.props.avatarHeight + 'px',
            width: this.props.avatarWidth + 'px',
            borderRadius: '50%'
        };
        return (
            <div id='particles' className='top-wrap full-width full-height' style={style}>
                <div className='padding-40 full-width flex-center justify-between'>
                    <div className='flex-center justify-center'>
                        <MenuBar />
                    </div>
                    <div className='flex-center justify-center'>
                        <div className={'search flex-center justify-center ' + this.state.hide}>
                            <i className='fa fa-search' onClick={(e) => this.showSearch()}/>
                            <input name='search' onChange={(e) => this.handleChange(e)}/>
                        </div>

                        <img src={this.props.avatar} style={avatarStyle}/>
                    </div>
                </div>
                <div id='top' className='flex-center justify-center'>

                    <div className='margin-left-15'>
                        <AutoWords words={'我是一只鸭，嘎嘎嘎嘎嘎嘎'} />
                        <h2 id='title'>李亚欧</h2>
                        <p id='subtitle'>一名努力成为全栈的前端开发</p>
                    </div>
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
    avatarWidth: '40',
    avatarHeight: '40',
};

Top.propTypes = {
    bkg: PropTypes.string,
    height: PropTypes.string,
    avatar: PropTypes.string,
    avatarWidth: PropTypes.number,
    avatarHeight: PropTypes.number,
    name: PropTypes.string
};

export default Top;