import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Card.css';
import { Link } from 'react-router-dom';
import game from '../../assets/img/game_thumbnail.png';

class Card extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='card' onClick={(e) => this.props.toRoute({path: this.props.path}, 'e')}>
                <img src={game} />
            </div>
        )
    }
}

export default withRouter(Card);