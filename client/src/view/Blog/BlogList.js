import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Divider, PlaceHolder, InfiniteList } from '../../common';
import './Blog.css';
import { isLoggedIn } from '../../lib';
import { fetchAPI, API, DEFAULT_DURATION, storage, formatTime } from '../../lib';

class BlogList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            test: '',
            page: {
                current: 0,
                next: 1,
            }
        }
    }

    loadData(callback) {
        fetchAPI({
            url: API.ARTICLE,
            params: {
                page: this.state.page.next,
                size: 5,
            },
            success: (data, page) => {
                this.setState({
                    list: this.state.list.concat(data),
                    page: {
                        current: page.current,
                        next: page.total > page.current ? (page.current + 1) : page.current
                    }
                });
                callback();
            }
        });
    }

    componentWillMount() {
        this.loadData();
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
                    <InfiniteList load={this.loadData.bind(this)} page={this.state.page} >
                        {   this.state.list.map((blog) =>
                            <div className="art-title" onClick={(e) => { this.props.toRoute({path: `/blog/${blog.id}`}) }} key={blog.id}>
                                <Divider height="4px" width="12px" bkgColor="#3C3C3C" />
                                <div className="topic">{blog.title}</div>
                                <div className="text">{blog.content.slice(0, 10)}</div>
                                <div className="date">{formatTime(blog.time * 1000, 'yyyy-mm-dd')}</div>
                            </div>
                        )}
                    </InfiniteList>
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