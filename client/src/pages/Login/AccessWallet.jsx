import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios";

const AccessWallet = (props) => {
  const onFinish = (values) => {
    console.log("Success:", values);
    axios({
      method: "post",
      url: "http://localhost:3001/mine",
      params: {}
    }).then(response => {
      console.log(response);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="login-container">
        <div className="login-header">
          <h1>Access Wallet</h1>
        </div>
        <div className="login-content">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Public Key"
              name="publicKey"
              rules={[
                {
                  required: true,
                  message: "Please input your public key!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Access Wallet
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default AccessWallet;
