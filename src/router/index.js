
import React,{Component,lazy,Suspense} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { Layout , Menu, Spin } from 'antd';
import {topMenuConfig,siderMenuConfig} from './menu.config';
import styles from './index.module.css';

//pages
const Home = lazy(()=>import('./../pages/Home'));
const User = lazy(()=>import('./../pages/User')) ;
const Login = lazy(()=>import('./../pages/Login'));
const Register = lazy(()=>import('./../pages/Register'));



const { Header, Content, Footer, Sider } = Layout;
const TopMenuItems = topMenuConfig.map(item=>(
    <Menu.Item key={item.key}><Link to={item.to}>{item.title}</Link></Menu.Item>
))

export default class RouterIndex extends Component{ 
    state = {
        path :window.location.pathname.split('/')[1]?'/'+window.location.pathname.split('/')[1]:'',
        siderKey:window.location.pathname.split('/')[2]?'/'+window.location.pathname.split('/')[2]:'',
    }
    handleTopMenuChange = item => {
        this.setState({
            path:item.key==='/'?'':item.key,
            siderKey:'/'
        })
    }

    handleSiderMenuChange = item => {
        this.setState({
            siderKey:item.key==='/'?'':item.key
        })
    }

    renderSiderMenuItems = ()=>{
        return siderMenuConfig.map(item=>(
            <Menu.Item key={item.key}><Link to={this.state.path+item.to}>{item.title}</Link></Menu.Item>
        ))
    }
    render(){
        const { path,siderKey } = this.state;
        const siderMenuItems = this.renderSiderMenuItems();
        return (
            <Router >
                <Switch>
                    <Route path='/register'>
                        <Suspense fallback={<Spin />}>
                            <Register />
                        </Suspense>
                    </Route>
                    <Route path="/login">
                        <Suspense fallback={<Spin />}>
                            <Login />
                        </Suspense>
                    </Route>
                    <Route path="/">
                        <Layout className={styles.layout}>
                            <Header className={styles.header} >
                                    <div className={styles.logobox}>
                                        LOGO
                                    </div>
                                    <div  className={styles.topMenuItems}>
                                        <Menu
                                            theme="dark"
                                            mode="horizontal"
                                            selectedKeys={[path===''?'/':path]}
                                            style={{ lineHeight: '64px' }}
                                            onSelect= {this.handleTopMenuChange}
                                        >
                                        {TopMenuItems}
                                        </Menu>
                                    </div>
                                    <div className={styles.userbox}></div>
                        
                            </Header>
                        
                            <Layout>
                                <Sider theme="light" className={styles.sider}>
                                        <Menu
                                            theme="dark"
                                            mode="vertical"
                                            selectedKeys={[siderKey===''?'/':siderKey]}
                                            style={{ height:"100%"}}
                                            onSelect={this.handleSiderMenuChange}
                                        >
                                            {siderMenuItems}
                                        </Menu>
                                </Sider>
                                <Content style={{ padding: '20px 30px 0' }}>
                                    <div style={{ background: '#fff', padding: 24, height:'100%',borderRadius:'10px',overflow:'hidden' }}>
                                        <Switch>
                                            <Route path="/user">
                                                <Suspense fallback={<Spin />}>
                                                    <User />
                                                </Suspense>
                                            </Route>
                                            <Route path="/">
                                                <Suspense fallback={<Spin />}>
                                                    <Home />
                                                </Suspense>
                                            </Route>
                                        </Switch>
                                    </div>
                                </Content>
                            </Layout>
                            <Footer style={{ textAlign: 'center' }}>Melody World ©2019 Created by melodyWxy</Footer>
                        </Layout>
                    </Route>
                </Switch>


            </Router>
        );
    }
}
