import { Form, Input, Button, Checkbox } from "antd";
import React from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const SignUp = (props) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    props.nextStep();
  };

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="comfirmPassword"
        rules={[
          {
            required: true,
            message: "Please input Comfirm Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Comfirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button">
          Create wallet
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
