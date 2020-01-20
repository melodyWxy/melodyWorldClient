import React from 'react'
import Markdown from 'react-markdown';
import styles from './index.module.css';
import {connect} from 'react-redux';
 
function Home(props){
    const { homeMd = '' } = props;  
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

const NHome = connect((state)=>{
  console.log(state);
  return {}
})(Home);
 
export default NHome;

