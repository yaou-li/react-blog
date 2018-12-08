import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../../common/common.css';
import { Spinner } from '../../common';
import './Content.css'
import Loadable from 'react-loadable';

class Content extends Component {

    render() {
        const Demo = Loadable({
            loader: () => import('../Demo/Demo'),
            loading: Spinner
        });
        const Blog = Loadable({
            loader: () => import('../Blog/Blog'),
            loading: Spinner
        });
        const Login = Loadable({
            loader: () => import('../Login/Login'),
            loading: Spinner
        });
        const About = Loadable({
            loader: () => import('../About/About'),
            loading: Spinner
        })
        const Editor = Loadable({
            loader: () => import('../Editor/Editor'),
            loading: Spinner
        })
        // const NotFoundLoadable = Loadable({
        //     loader: () => import('../NotFound/NotFound'),
        //     loading: Spinner
        // });
        return (
            <div className='content-wrap'>
                <div className='content'>
                    <Switch>
                        <Route path='/demo' render={(props) => <Demo toRoute={this.props.toRoute} {...props}/>}/>
                        <Route path='/blog' render={(props) => <Blog toRoute={this.props.toRoute} {...props}/>}/>
                        <Route path='/login' render={(props) => <Login toRoute={this.props.toRoute} {...props}/>}/>
                        <Route path='/about' render={(props) => <About toRoute={this.props.toRoute} {...props}/>}/>
                        <Route path='/editor' render={(props) => <Editor toRoute={this.props.toRoute} {...props}/>}/>
                        {/* <Route path='/realtime' component={RealtimeLoadable}/>
                        <Route component={NotFoundLoadable}/> */}
                    </Switch>
                </div>
                {/* <div className='flex-center full-width justify-center' >
                    <Spinner height={30} width={30} duration={5}/>
                </div> */}
            </div>
        );
    }
}

export default Content;
