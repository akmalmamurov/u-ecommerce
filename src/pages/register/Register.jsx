import { Button, Form, Input, message } from "antd";
import request from "../../server";

export const Register = () => {
  const onFinish = async (values) => {
    try {
      await request.post("auth/register", values);
      message.info("Congratulations Congratulations to you");
    } catch (err) {
      message.error(err.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Raqamni faqatgina raqamlar bilan kiritish uchun validatsiyani sozlash
  const validatePhoneNumber = (_, value) => {
    if (!value || /^\d+$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Please enter numbers only!"));
  };

  return (
    <div className="register_section">
      <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name="phone_number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
            {
              validator: validatePhoneNumber,
            },
          ]}
        >
          <Input
            initialValues={{
              phone_number: "+998",
            }}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
