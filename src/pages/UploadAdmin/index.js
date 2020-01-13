import React,{useRef}  from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';
import { useConstructor, useComponentWillUnmount } from './../../utils/lifeHooks';
import toc from  'remark-toc';
import styles from './index.module.css';
import { Button, Input, message } from 'antd';




function UploadAdmin(props){

    const timerRef = useRef();
    const inputRef = useRef();

    const mdValue = window.localStorage.getItem('mdValue') || '' ; 

    const {state,setState} = useConstructor({
      value: mdValue
    })

    useComponentWillUnmount(()=>{
      timerRef.current && clearTimeout(timerRef.current);
    })

    const handleChange = e => {
      const {value} =  e.target;

      setState({
          value
      })

      //节流
      timerRef.current && clearTimeout(timerRef.current);
      timerRef.current = setTimeout(()=>{
        window.localStorage.setItem('mdValue',value);
      },2500)

    }

    const {value} = state; 

    const uploadMD = () => {
      if(!inputRef||!inputRef.current||!inputRef.current.input){
        message.warning('key can not be null!');
        return ;
      }
      const key = inputRef.current.input.value;
      props.dispatch({
        type: 'UPLOAD_BLOBS',
        payload: {
          values:{
            key,
            data: value
          }
        }
      })
    }

    return (
      <>
        <div className = {styles.container} >
            <div className = {styles.editorWrap}>
                <textarea 
                    mode = "markdown"
                    className = {styles.editor}
                    onChange = {handleChange}
                    defaultValue = {value}
                />
            </div>
            <div 
                className = {styles.markdown}
            >
                <Markdown 
                    escapeHtml = {false}
                    source = {value}
                    plugins={[toc]}
                />
            </div>
        </div>
        <Input ref={inputRef}/>
        <Button 
          type='primary'
          onClick = {uploadMD}
        >
          提交
        </Button>
      </>
    )

}

export default connect(()=>({

}),dispatch=>({dispatch}))(UploadAdmin)