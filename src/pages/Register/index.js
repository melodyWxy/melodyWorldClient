import React from 'react';
import { connect } from 'react-redux'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Button,
  message,
} from 'antd';
import { xPost } from '../../utils/xFetch';
import styles from  "./index.module.css";
import UploadHeader from './UploadHeader';



const formItemLayout = {
    labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    },
    wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
    xs: {
        span: 24,
        offset: 0,
    },
    sm: {
        span: 16,
        offset: 8,
    },
    },
};


@connect(({login})=>({
    login
}),dispatch=>({
  dispatch
}))
class RegistrationForm extends React.Component {
    
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
   imgData= {}

   handleSubmit =  e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log(this.imgData);
        const {headerImgUrl,headerImgName} = this.imgData;
        headerImgUrl&&(values.headerImgUrl = headerImgUrl);
        headerImgName&&(values.headerImgName = headerImgName);
        console.log(values);
        const res = await xPost('/register',values)
        if(!res.isSuccess){
          message.error(res.msg);
        }else{
          message.success(res.msg);
          setTimeout(()=>{
            window.location.pathname = '/login';
          },500)
        } 
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };




  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className={styles.form}>
        <Form.Item
          label={
            <span>
              Head portrait&nbsp;
            </span>
          }
        > 
          <UploadHeader updateImgDate={(data)=>{
            console.log(data);
            this.imgData=data;
          }}/>
        </Form.Item>
        <Form.Item
          label={
            <span>
              Username&nbsp;
              <Tooltip title="也作为你的昵称(nickname)">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
    
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>

        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default WrappedRegistrationForm;