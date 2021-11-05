import React from 'react';
import 'antd/dist/antd.css';
import { Form, Button, Input } from 'antd';



function RegistrationForm() {
  
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 21,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
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

  const onFinish = (values) => {
    const newUser = {
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      password: values.password
    };
    NewUserSign(values);
    console.log("see on see newUser:", newUser);

    fetch('http://localhost:8081/api/auth/' + newUser.email)
      .then(response => { 
        if(response.ok){
          console.log(response);
          throw new Error("User with that e-mail already exists")
        } else {
          NewUserSign(newUser)
        }
    }).catch ( errorInfo => {
      onFinishFailed(errorInfo);
    });
  }    
  function NewUserSign(values) {
    const newUser = {
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      password: values.password
    };
    
    return( 
      fetch('http://localhost:8081/api/auth/signup/', {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {'Content-Type':'application/json'}
    }).then(response => {
      console.log(response)
      if(response.ok) {
        let workingInfo = "done"
        onFinishworked(workingInfo);
      } else {
        throw new Error("Problem with adding account")
      }
    }).catch ( errorInfo => {
      onFinishFailed(errorInfo);
    }));
  };


  const onFinishFailed = (errorInfo) => {
    console.log('dosent work: ', errorInfo);
  };
  
  const onFinishworked = (worksInfo) => {
    console.log('works: ', worksInfo);
  };

  
  return (
    
    <Form 
      {...formItemLayout}
      name="register"
      className ="Register"
      onFinish={onFinish}
      initialValues={{
        prefix: '86',
      }}
      scrollToFirstError
    >

      
      <Form.Item
        name="firstname"
        label="Firstname"
        rules={[
          {
            required: true,
            message: 'Please input your Firstname!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      

      <Form.Item
        name="lastname"
        label="Lastname"
        rules={[
          {
            required: true,
            message: 'Please input your Lastname!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>    
      
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="username"
        label="Username"
        tooltip="What should you be called uh :/"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" >
          Register
        </Button>
      </Form.Item>
    </Form>
    
  );
};

export default RegistrationForm;