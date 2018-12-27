import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InfiniteList extends Component {
    constructor(props) {
        super(props);
        this.listRef = React.createRef();
        this.queue = [];
        this.pending = false;
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
        this.onScroll();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll() {
        // fire if reach the bottom of list and there is not any other api that is already fired
        requestAnimationFrame(() => {
            if (this.pending || !this.hasMore()) return this;
            let el = this.listRef.current;
            if (this.bottomReached(el)) {
                this.pending = true;
                this.props.load(() => {
                    this.pending = false;
                });
            }
        })
        
    }

    bottomReached(el) {
        //TODO refine the logic for bottom reached
        let body = document.body,
            html = document.documentElement;

        let height = Math.max( body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);
        return window.innerHeight + window.scrollY >= height - this.props.offset
        // let height = window.innerHeight - el.offsetTop;
        // console.log(height, el.offsetTop, el.scrollTop, el.scrollHeight);
        // return (height + el.scrollTop) >= (el.scrollHeight - this.props.offset)
    }

    hasMore() {
        return this.props.page.next > this.props.page.current
    }

    render() {
        return (
            <div className="infinite-list" ref={this.listRef} onScroll={(e) => this.onScroll(e)}>
                { this.props.children }
                {   this.props.hasMore &&
                    this.props.loader
                }
            </div>
        )
    }
}

InfiniteList.defaultProps = {
    offset: 0,
    hasMore: true
}

InfiniteList.propTypes = {
    load: PropTypes.func,
    loader: PropTypes.object,
    offset: PropTypes.number,
    page: PropTypes.object,
}

export default InfiniteList;

