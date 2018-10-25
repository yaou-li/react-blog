import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Card.css';
import { Divider, PlaceHolder } from '../../common';
import { Link } from 'react-router-dom';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ref: 'card' + this.props.cardId,
        }
    }

    componentDidMount() {
        
    }

    componentDidUpdate() {
        // console.log(this.props);
    }

    imageOnLoad(e) {
        this.props.rendered(this.props.cardId, this.refs[this.state.ref], this.props.row, this.props.col);
    }

    render() {
        const style = {
            maxWidth: this.props.layout.maxWidth,
            padding: this.props.layout.padding,
            margin: this.props.layout.margin,
            width: this.props.layout.width,
            left: this.props.layout.offsetX,
            top: (this.props.layout.offsetY[this.props.row] || 0),
        }

        return (
            <div ref={this.state.ref} className='card' onClick={(e) => this.props.toRoute({path: this.props.path}, 'e')} style={style}>
                {/* <img src={this.props.thumbnail} /> */}
                <img src={this.props.data.thumbnail} onLoad={(e) => this.imageOnLoad(e)}/>
                <div className='card-title'>{this.props.data.title}</div>
                <Divider />
                <div className='card-desc'>{this.props.data.desc}</div>
            </div>
        )
    }
}

Card.defaultProps = {
    thumbnail: '',
    title: '',
    desc: '',
    cardId: 0,
    row: '',
    col: '',
    rendered: () => {}
};

Card.propTypes = {
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    cardId: PropTypes.number,
    row: PropTypes.number,
    col: PropTypes.number,
    rendered: PropTypes.func,
    data: PropTypes.object
};

export default withRouter(Card);