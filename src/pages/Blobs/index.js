import React from 'react';
import {connect} from 'react-redux'; 
import Markdown from 'react-markdown';
import styles from './index.module.css';

     //渲染md底部样式的方法的方法 
const renderMDBottom = () => (
    <div>
        <div className={styles.btlr}> 
            <div>
                <div  className={styles.goodbox+` ${styles.goodIcon}`}/>
                <div style={{marginLeft:"6px"}}>330</div>
            </div>
            <div>
                <div className={styles.goodbox+` ${styles.storeIcon}`}/>
                <div style={{marginLeft:"6px"}}>130</div>
            </div>
        </div>
        <div>
            <div style={{color:"#1890ff"}}>melodyWxy</div>
            <div style={{color:"#515151"}}>Issued on 2010-01-01</div>
        </div> 
    </div>
)
function Blobs(props){
    console.log(props,'bp');
    const { blobs = {} } = props;
    const { blobMd = '' }  =blobs;
    return (
        <>
            <div className={styles.mdwrap}>
                <Markdown  source = {blobMd} />
            </div>
        </>
    )
}

// const NHome = connect(Home);
 
export default connect(({blobs})=>({blobs}))(Blobs);

