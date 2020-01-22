import React from 'react';
import {Link} from 'react-router-dom';
import {Menu} from 'antd';
import { topMenuConfig } from '../../router/menu.config';


const TopMenuItems = topMenuConfig.map(item=>(
    <Menu.Item key={item.key}><Link to={item.to}>{item.title}</Link></Menu.Item>
))

export function TopMenu(props){
    const {path = '/', handleTopMenuChange } = props;
    return (
        <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[path]}
            style={{ lineHeight: '64px' }}
            onSelect= {handleTopMenuChange}
        >
            {TopMenuItems}
        </Menu>
    )
}
export default TopMenu;
