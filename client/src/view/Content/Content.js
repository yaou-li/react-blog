import React, { Component } from 'react';
import '../../common/common.css'
import { Spinner } from '../../common'

class Content extends Component {

    render() {
        return (
            <div className='content-wrap'>
                <div className='content'>

                </div>
                <div className='flex-center full-width justify-center' >
                    <Spinner height={30} width={30} duration={5}/>
                </div>
            </div>
        );
    }
}

export default Content;
