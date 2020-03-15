import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, message } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NodeRSA from 'node-rsa';
import search2obj from '../../utils/search2obj';
import './index.css';
import { xGet } from '../../utils/xFetch';


@withRouter
@connect(({login})=>({
  login
}),dispatch=>({
  dispatch
}))
class NormalLoginForm extends React.Component {
  publicDer = '';
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // const res =await xPost('/login',values);
        const params =  window.location.search && search2obj(window.location.search);
        const Public_key = new NodeRSA(this.publicDer);

        // 公钥加密
        values.nickname = Public_key.encrypt(values.nickname,'base64','utf8');
        values.password = Public_key.encrypt(values.password,'base64','utf8');
        console.log('小朋友，你是看不见账号密码的!',values);
        const { history = {} } = this.props;
        this.props.dispatch({
          type: "USER_LOGIN",
          payload: {
            values,
            callback:()=>{
              const path = params.callback||'/'
              history.push(path)
            }
          }
        })
      }
    });
  };
  linkToRegister = ()=>{
    //记录当前的path参数
    const nowPath = window.location.href.replace(window.location.origin+'/login','');
    this.props.history&&this.props.history.push(`/register${nowPath}`);
  }
  
  componentDidMount(){
    this.publicDer =  window.localStorage.getItem('publicDer');
    if(!this.publicDer){
      xGet('/der/getPublicDer')
        .then(res=>{
          if(res.code===200){
            this.publicDer = res.data.publicDer;
            window.localStorage.setItem('publicDer',this.publicDer)
          }else{
            message.error(res.msg||'获取公钥失败！')
          }
        })
        .catch(err=>{
          console.log(err);
          message.error('获取公钥失败！您的网络是否已打开？')
        })
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your username or nickname!' }],
          })(
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Link className="login-form-forgot" to="/user/forget">
            密码忘记了？
          </Link>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a onClick = {this.linkToRegister}>现在注册吧!</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;