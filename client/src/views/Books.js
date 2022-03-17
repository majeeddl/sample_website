import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  List,
  Avatar,
  Space,
  Divider,
  Spin,
  Popconfirm,
  message,
  Button,
  notification,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const Books = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([
    {
      title: "book1",
      description: "this is book one",
    },
  ]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: response } = await axios.get(
        "http://localhost:3001/api/v1/books"
      );
      setBooks(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();
  const goCreateBook = () => {
    navigate("/books/create");
  };

  const goEditBook = (id) => {
    navigate("/books/edit/" + id);
  };

  const confirm = async (id) => {
    // console.log(e);
    try {
      const { data: response } = await axios.delete(
        `http://localhost:3001/api/v1/books/${id}`
      );

      if (response.status) {
        openNotificationWithIcon("success", "The book is deleted successfully");
        fetchData();
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
    });
  };

  const cancel = (e) => {
    console.log(e);
    // message.error("Click on No");
  };

  return (
    <div>
      <div className="mt-20 text-left">
        <h3 className="text-2xl">Books</h3>
        <div className="mt-2">
          You can see the list of books here:
          <div className="float-right">
            <Button
              icon={<PlusCircleOutlined />}
              type="primary"
              onClick={goCreateBook}
            >
              Add New Book
            </Button>
          </div>
        </div>
        <Divider></Divider>
        <div className="mt-2">
          <Spin tip="Loading..." spinning={loading}>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              dataSource={books}
              //   footer={
              //     // <div>
              //     //   <b>ant design</b> footer part
              //     // </div>
              //   }
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <a
                      key="list-loadmore-edit"
                      onClick={() => goEditBook(item._id)}
                    >
                      edit
                    </a>,
                    <Popconfirm
                      title="Are you sure to delete this task?"
                      onConfirm={() => confirm(item._id)}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <a key="list-loadmore-more" href="#">
                        delete
                      </a>
                    </Popconfirm>,
                  ]}
                  extra={
                    // <img
                    //   width={272}
                    //   alt="logo"
                    //   src={"http://localhost:3001/api/v1/file/" + item.image}
                    // />
                    <Avatar src={item.image} />
                  }
                >
                  <List.Item.Meta
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default Books;
