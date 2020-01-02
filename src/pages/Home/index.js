import React from 'react'
import Markdown from 'react-markdown';
import styles from './index.module.css';

 
function Home(){
    return (
        <>
            <div className={styles.mdwrap}>
                <Markdown  source = "# Your markdown here"/>
            </div>
        </>
    )
}

// const NHome = connect(Home);
 
export default Home;

