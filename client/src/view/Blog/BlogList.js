import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Divider, PlaceHolder } from '../../common';
import './Blog.css';
import { isLoggedIn } from '../../lib';


class BlogList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="blog-list">
                <div className="title">Blog</div>
                <section id="category-list">
                    <p className="category-item">JavaScript</p>
                    <p className="category-item">CSS</p>
                    <p className="category-item">Python</p>
                    <p className="category-item">Scrawler</p>
                    <p className="category-item">Golang</p>
                    <p className="category-item">C++</p>
                    <p className="category-item">日常随笔</p>
                    <p className="category-item">经济杂谈</p>
                    <p className="category-item">Linux</p>
                    <p className="category-item">Docker</p>
                    <p className="category-item">硬件设备</p>
                    <p className="category-item">Nginx</p>
                </section>
                <PlaceHolder height="2em"/>
                <section className="arts-in-year">
                    <div className="year">2018</div>
                    <Divider />
                    <PlaceHolder height="2em"/>
                    <div className="art-title" onClick={(e) => { this.props.toRoute({path: "/blog/1"}) }}>
                        <Divider height="4px" width="12px" bkgColor="#3C3C3C" />
                        <div className="topic">Nginx配置的二三事</div>
                        <div className="text">Nginx配置的二三事</div>
                        <div className="date">2018.06.25</div>
                    </div>
                    <div className="art-title" onClick={(e) => { this.props.toRoute({path: "/blog/2"}) }}>
                        <Divider height="4px" width="12px" bkgColor="#3C3C3C" />
                        <div className="topic">Yon Don"t Know JS读书笔记</div>
                        <div className="text">Yon Don"t Know JS读书笔记</div>
                        <div className="date">2018.06.25</div>
                    </div>
                    <div className="art-title" onClick={(e) => { this.props.toRoute({path: "/blog/2"}) }}>
                        <Divider height="4px" width="12px" bkgColor="#3C3C3C" />
                        <div className="topic">初学python</div>
                        <div className="text">初学python</div>
                        <div className="date">2018.06.25</div>
                    </div>
                </section>
                {   isLoggedIn() &&
                    <div className="btn btn-new" onClick={(e) => this.props.toRoute({path: '/editor'})}>
                        <i className="fas fa-pencil-alt"></i>
                    </div>
                }
                
            </div> 
        )
    }
}

export default BlogList;