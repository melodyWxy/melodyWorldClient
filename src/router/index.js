import React,{lazy,Suspense} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { Layout, Menu, Spin } from 'antd';
import {topMenuConfig} from './menu.config';
import styles from './index.module.css';

//pages
const Home = lazy(()=>import('./../pages/Home'));
const User = lazy(()=>import('./../pages/User')) ;
const Login = lazy(()=>import('./../pages/Login'));
const Register = lazy(()=>import('./../pages/Register'));


const { Header, Content, Footer } = Layout;
export default function RouterIndex() {
  const defaultMenuPath = window.location.pathname==='/'?'home':window.location.pathname.replace('/','');
  const TopMenuItems = topMenuConfig.map(item=>(
      <Menu.Item key={item.key}><Link to={item.to}>{item.title}</Link></Menu.Item>
  ))
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
                    <Header className={styles.header}>
                        <div className={styles.logobox}>
                            LOGO
                        </div>
                        <div className={styles.topmenu}>
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={[defaultMenuPath]}
                                style={{ lineHeight: '64px' }}
                            >
                            {TopMenuItems}
                            </Menu>
                        </div>
                        <div className={styles.userbox}></div>
                    </Header>
                    <Content style={{ padding: '50px 50px' }}>
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
                    <Footer style={{ textAlign: 'center' }}>Melody World ©2019 Created by melodyWxy</Footer>
                </Layout>
            </Route>
        </Switch>


    </Router>
  );
}
