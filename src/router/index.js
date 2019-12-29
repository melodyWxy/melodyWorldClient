import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Home from './../pages/Home';
import User from './../pages/User';
import { Layout, Menu } from 'antd';
import {topMenuConfig} from './menu.config';
import Login from './../pages/Login';
import Register from './../pages/Register';
import styles from './index.module.css';


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
                <Register />
            </Route>
            <Route path="/login">
                <Login />
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
                                    <User />
                                </Route>
                                <Route path="/">
                                    <Home />
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
