import { Button, Form, Input, message, Select } from "antd";
import request from "../../server";
import "./Register.scss";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 12,
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
      span: 12,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const Register = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { phone_number, ...restValues } = values;

    const processedPhoneNumber = phone_number
      .replace(/\s+/g, "")
      .replace("+", "");

    try {
      const newValues = { ...restValues, phone_number: processedPhoneNumber };
      await request.post("/auth/register", newValues);
      message.success("Successfully registered!");
      form.resetFields();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register-section">
      <Form
        className="regist_form"
        {...formItemLayout}
        form={form}
        name="register"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          phone_number: "+998",
        }}
        style={{
          maxWidth: 800,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
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
              type: "email",
              message: "The input is not a valid email!",
            },
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
