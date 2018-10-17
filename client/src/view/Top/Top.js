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
            hide: 'hide',
            tH: '120px'
        };
    }

    componentDidMount() {
        if (this.atHome()) {
            window.particlesJS('particles',particleConf);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.height !== this.state.tH && this.props.height === this.state.tH) {
            this.resetParticles();
        } else if (prevProps.height === this.state.tH && this.props.height !== this.state.tH) {
            setTimeout(() => {
                window.particlesJS('particles',particleConf);
            }, 500);
            
        }
    }

    showSearch() {
        this.setState({
            hide: '',
        });
    }
    
    atHome() {
        return this.props.location.pathname === '/';
    }

    resetParticles() {
        console.log('trigger');
        let el = document.getElementById('particles');
        let childs = Array.prototype.slice.call(el.children);
        for (let i in childs) {
            let child = childs[i];
            if (child.tagName.toLowerCase() == 'canvas') {
                el.removeChild(child);
                break;
            }
        }
        // window.particlesJS('particles',particleConf);
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
            <div id='particles' className='top-wrap full-width full-height' style={style} onClick={(e) => this.props.toggleNavbar('hide', e)}>
                <div className='padding-40 full-width flex-center justify-between'>
                    <div className='clearfix flex-center justify-center' onClick={(e) => this.props.toggleNavbar('show', e)}>
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
                { this.atHome() &&
                    <div id='top' className='flex-center justify-center'>
                        <div className='margin-left-15'>
                            <AutoWords words={'我是一只鸭，嘎嘎嘎嘎嘎嘎'} />
                            <h2 id='title'>李亚欧</h2>
                            <p id='subtitle'>一名努力成为全栈的前端开发</p>
                        </div>
                    </div>
                }
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
    toggleNavbar: null,
};

Top.propTypes = {
    bkg: PropTypes.string,
    height: PropTypes.string,
    avatar: PropTypes.string,
    avatarWidth: PropTypes.string,
    avatarHeight: PropTypes.string,
    name: PropTypes.string,
    toggleNavbar: PropTypes.func
};

export default Top;