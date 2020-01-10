import React from 'react'
import Markdown from 'react-markdown';
import styles from './index.module.css';

 
function Home(props){
    const { homeMd = '' } = props;  
    return (
        <>
            home
            <div className={styles.mdwrap}>
                <Markdown  source = {homeMd}/>
            </div>
        </>
    )
}

// const NHome = connect(Home);
 
export default Home;

