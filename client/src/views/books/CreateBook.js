import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Divider,
  Form,
  Input,
  Button,
  Upload,
  message,
  notification,
} from "antd";
import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 16 },
};

const CreateBook = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    values = { ...values, image: image };
    try {
      const { data: response } = await axios.post(
        "http://localhost:3001/api/v1/books",
        values
      );

      if (response.status) {
        openNotificationWithIcon("success", "The book is created successfully");
        onReset();
      } else {
        openNotificationWithIcon("error", "Error occured");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const navigate = useNavigate();
  const goBooks = () => {
    navigate('/books')
  };

  const [image, setImage] = useState("");

  const props = {
    name: "file",
    action: "http://localhost:3001/api/v1/file",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        console.log("info");
        console.log(info.file);

        setImage(info.file.response.fileName);
      } else if (info.file.status === "error") {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };
  return (
    <div className="text-left">
      <div className="mt-20 ">
        <h3 className="text-2xl">Create New Book</h3>
        <Button
          icon={<ArrowLeftOutlined />}
          type="dashed"
          className="float-right mb-2"
          onClick={goBooks}
        >
          Return
        </Button>
      </div>
      <Divider></Divider>
      <Form
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="author" label="Author" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Image">
          <Upload {...props} maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset} className="ml-2">
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateBook;
