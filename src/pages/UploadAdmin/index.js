import React,{ createRef } from 'react'
import { Upload, Button, Icon } from 'antd';

export default class  extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  };
  
  userRef = createRef();
  pdRef = createRef(); 
   
  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      
      formData.append('files[]', file);
      console.log(file);
      console.log(formData.values())
    });

    this.setState({
      uploading: true,
    });



  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div>
        <input 
            placeholder="user"
            ref={this.userRef}
        />
        <input 
            placeholder="password"
            ref={this.userRef}
        />

        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </div>
    );
  }
}

