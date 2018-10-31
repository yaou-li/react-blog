import React, { Component } from 'react';
import './Demo.css';
import { fetchAPI, format, API } from '../../lib'
import { Card } from '../../common';
import game from '../../assets/img/game_thumbnail.png';

class CardList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.data = [{
            thumbnail: game,
            title: 'Love Heart',
            desc: 'BlablababablbalallBlablababablbalallBlablababablbalallBlablababablbalallBlablababablbalall'
        },
        {
            thumbnail: game,
            title: 'Love Heart',
            desc: ''
        }]
        this.state.cols = this.calcChildLayout(this.state.data);
        this.state.padding = window.innerWidth < 640 ? 4 : 8;
        this.state.margin = window.innerWidth < 640 ? 4 : 6;
        this.state.maxWidth = window.innerWidth < 640 ? 'calc(50% - 8px)' : 'calc(33% - 12px)';
        this.renderedChild = this.renderedChild.bind(this);
        this.initData();
    }

    initData() {
        fetchAPI({
            url: format(API.DEMO, {demoId: 1}),
            success: (data) => {
                console.log(data);
            }
        });
    }

    navOut(options) {
        //nav out of react-router
        window.location.href = options.path;
    }

    calcChildLayout(data) {
        let cols = {
            length: window.innerWidth < 640 ? 2 : 3
        };
        for (let i = 0; i < cols.length; i++) {
            let arr = new Array(Math.ceil(data.length / cols.length)) ;
            arr.fill(0);
            cols[i] = {
                width: window.innerWidth / cols.length,
                offsetY: arr,
                offsetX: (window.innerWidth / cols.length) * i,
            }
        }
        return cols;
    }

    renderedChild(cardId, el, rowNum, colNum) {
        let cols = this.state.cols;
        cols[colNum].offsetY.map((offsetY,index) => {
            if (index <= rowNum) return;
            cols[colNum].offsetY[index] += el.clientHeight + (this.state.margin * 2);
        });
        this.setState({cols: cols});
    }

    renderCards() {
        let cards = [];
        for (let i = 0; i < this.state.data.length; i++) {
            let rowNum = parseInt(i / this.state.cols.length);
            let colNum = i % this.state.cols.length;
            let layout = Object.assign({
                padding: this.state.padding,
                margin: this.state.margin,
                maxWidth: this.state.maxWidth
            }, this.state.cols[colNum]);

            cards.push(
                <Card 
                    key={i}
                    data={this.state.data[i]}
                    toRoute={this.navOut.bind(this)} 
                    path={'/demo/demo' + i} 
                    cardId={i} 
                    rendered={this.renderedChild} 
                    row={rowNum}
                    col={colNum}
                    layout={layout}
                />
            );
        }
        return cards;
    }



    render() {
        return (
            <div className='card-list full-width full-height'>
                {this.renderCards()}
            </div>
        )
    }
}

export default CardList;