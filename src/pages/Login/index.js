import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import search2obj from '../../utils/search2obj';
import './index.css';


@withRouter
@connect(({login})=>({
  login
}),dispatch=>({
  dispatch
}))
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // const res =await xPost('/login',values);
        const params =  window.location.search && search2obj(window.location.search);
        console.log(params);
        const {history = {}} = this.props;
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

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your username or nickname!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
          Or <Link to="/register">现在注册吧!</Link>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;