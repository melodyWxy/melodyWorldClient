import React from 'react';
import {Link} from 'react-router-dom';
import {Menu,Icon} from 'antd';

const {SubMenu} = Menu;

function renderItems (list,path) {
    return list.map(item=>(
        <Menu.Item
            key={'/'+item.type+'/'+item.key}
        >
            <Link to={path==='/'?path+item.type+ '/'+item.key:path+'/'+item.type+'/'+item.key}>
                {item.title}
            </Link>
        </Menu.Item>
    ))
}


export function SiderMenu(props){

    const { path, handleSiderMenuChange, siderMenuItems=[]  } = props;
    const blobList = siderMenuItems.filter(item=>item.type==='blobs');
    const videoList = siderMenuItems.filter(item=>item.type==='class_video');
    return (
        <Menu
            theme="dark"
            mode="inline"
            style={{paddingTop:"10px"}}
            selectedKeys={[window.location.pathname.replace(path+'/','/')]}
            onSelect={ handleSiderMenuChange }
        >
            <Menu.Item key={path}>
                <Link to={path} >
                    <Icon type="inbox" /> 
                    概述
                </Link>
            </Menu.Item>
            <SubMenu key='/blobs' title={
                <span>
                    <Icon type="inbox" />
                    博客
                </span>
            }>
                {renderItems(blobList,path)}
            </SubMenu>
            <SubMenu key='/class_video' title={
                <span>
                    <Icon type="inbox" />
                    课程
                </span>
            }>
                {renderItems(videoList,path)}
            </SubMenu>
        </Menu>
    )
}
export default SiderMenu;
