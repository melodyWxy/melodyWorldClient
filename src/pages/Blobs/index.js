import React from 'react'
import Markdown from 'react-markdown';
import styles from './index.module.css';

 
function Blobs(){
    console.log('blobs');
    return (
        <>
            <div className={styles.mdwrap}>
                <Markdown  source = "# Your markdown here"/>
                <div className = {styles.mdbt}>
                    <div className={styles.btlr}> 
                        <div  className={styles.goodbox+` ${styles.goodIcon}`}/>
                        <div style={{marginLeft:"10px"}}>330</div>
                    </div>
                    <div className={styles.btlr}> 
                        <div style={{margin:"0 10px"}}>
                            it was released by 
                            <span style={{color:"#1890ff"}}> melodyWxy </span>
                            on 2010/01/01
                        </div>
                        <div>点击</div>
                        <div style={{margin:"0 10px"}} className={styles.goodbox+` ${styles.storeIcon}`}/>
                        <div>收藏</div>
                    </div>
                </div>
            </div>
        </>
    )
}

// const NHome = connect(Home);
 
export default Blobs;

