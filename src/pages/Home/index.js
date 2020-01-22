import React from 'react'
import Markdown from 'react-markdown';
import styles from './index.module.css';
import {connect} from 'react-redux';
 
function Home(props){
    const { homeMd = '' } = props;  
    if(!homeMd){
        return (
            <div>该内容区尚未开放，请等待作者上传相关资料哟~</div>
        )
    }
    return (
        <>
            <div className={styles.mdwrap}>
                <Markdown 
                    escapeHtml = {false}
                    source = {homeMd}/>
            </div>
        </>
    )
}

const NHome = connect(({blobs={}})=>({
    homeMd: blobs.homeMd||''
}))(Home);
 
export default NHome;

