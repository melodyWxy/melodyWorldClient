import React, {useState} from 'react';
import logo from './../../static/logo.png';
import PortalModal from './../PortalModal';
import styles from './index.module.css';


function LargeLogo (props){
    return (
        <div 
            className={styles.llw}
            onClick = {props.onClick}
        >
            <img  
                src= {logo}
            />
        </div>
    )
}



export default function (){
    const [showLogoLarge,setState] = useState(false); 


    return (
        <>
            <img  
                className={styles.logopng} 
                src= {logo}
                onClick = {()=>setState(true)}
            />
            {showLogoLarge&&(<PortalModal>
                <LargeLogo 
                    onClick = {()=>setState(false)}
                />
            </PortalModal>)}
        </>
) 


}