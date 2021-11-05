import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginUser } from '../store/actions';
import { Context } from "../store";
import { useContext } from "react";

function LoginForm() {
  const [state, dispatch] = useContext(Context);
  console.log(state)
  const OnFinish = (values) => {
    const LoginUser = {
      email: values.email,
      password: values.password
    };
    NewUserLogin(values);
  }    
  function NewUserLogin(values) {
    const LoginUser = {
      email: values.email,
      password: values.password
    };
    
    return( 
      fetch('http://localhost:8081/api/auth/login/', {
      method: "POST",
      body: JSON.stringify(LoginUser),
      headers: {'Content-Type':'application/json'}
    }).then(response => {
      return response.json();
      /*console.log(response)
      if(response.ok) {
        let workingInfo = "done"
        OnFinishworked(workingInfo);
        
      } else {
        throw new Error("Problem with logging in")
      }*/
    }).then(data => {
      dispatch(loginUser(data))
    }).catch ( errorInfo => {
      OnFinishFailed(errorInfo);
    }));
  };


  const OnFinishFailed = (errorInfo) => {
    console.log('dosent work: ', errorInfo);
  };
  
  const OnFinishworked = (worksInfo) => {
    console.log('works: ', worksInfo);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={OnFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="/UserRegister">register now!</a>
      </Form.Item>
    </Form>
  );
};

document.getElementById('root')

export default LoginForm;