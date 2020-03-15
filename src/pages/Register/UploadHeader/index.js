import React,{useState,useMemo} from 'react';
import OSS from 'ali-oss';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Upload, message } from 'antd';
import styles from './index.module.css';
import uploadBase64Img from './../../../utils/upload';
import  {xGet} from './../../../utils/xFetch';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}



export default function (props){
    const [loading,setLoading] = useState(false);
    const [imageUrl,setImageUrl] = useState('');
    let imgname = '';
    const uploadButton = useMemo(()=>(
        <div>
          <LegacyIcon type={loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
    ),[loading]);

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
        // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>{
                xGet('/ossSts')
                .then(res=>{
                    const client = new OSS({
                        region:'oss-cn-beijing',
                        accessKeyId:res.AccessKeyId,
                        accessKeySecret:res.AccessKeySecret,
                        bucket:'melodyworld',
                        stsToken:res.SecurityToken
                    })
                    uploadBase64Img(
                        client,
                        imageUrl,
                        `headers/${Date.now()}_${info.file.name}`,
                        data=>{
                            if(data.res.statusCode===200){
                                const nImageUrl = data.res.requestUrls[0]+'?x-oss-process=style/_90_90';
                                imgname = data.name;
                                setLoading(false);
                                setImageUrl(nImageUrl);
                                props.updateImgDate({
                                    headerImgUrl:nImageUrl,
                                    headerImgName:imgname
                                },imgname);
                            }
                        
                        },
                    )
                })


            });
        }
    };
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className={styles.upload}
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    )
} 