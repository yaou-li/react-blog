import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Divider, PlaceHolder } from '../../common';
import './Blog.css';


class BlogDetail extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div className='detail'>
                <div className='title'>Nginx的二三事</div>
                <div className='desc'>Nginx的二三事</div>
                <div className='content'>
                    <div className='subtitle'>配置文件</div>
                    <Divider />
                    <PlaceHolder height='10px' />
                    <div className='text'>通过nginx -t不光可以校验配置文件是否有语法错误，并且可以找到生效的nginx配置文件路径</div>
                    <pre>
                        <div>$sudo nginx -t</div>
                        <div>nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok</div>
                        <div>nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful</div>
                    </pre>
                    
                </div>
            </div>
        )
    }
}

export default BlogDetail;