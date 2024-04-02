import { Button, Form, Input, message, Select } from "antd";
import * as yup from "yup";
import request from "../../server";
const { Option } = Select;
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
const registerSchema = yup.object().shape({
  name: yup.string("Name must be string !").required("Please fill!"),
  email: yup.string().email("This field must be valid email !"),
  phone_number: yup.string().required(),
  password: yup.string().required(),
});
const yupSync = {
  async validator({ field }, value) {
    await registerSchema.validateSyncAt(field, { [field]: value });
  },
};
export const Register = () => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      await request.post("/auth/register", values);
      message.success("Tez orada sms kodni olasiz");
    } catch (err) {
      message.error(err);
    }
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 120,
        }}
      >
        <Option value="+998">+998</Option>
      </Select>
    </Form.Item>
  );

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
          prefix: "+998",
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
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
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
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
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
