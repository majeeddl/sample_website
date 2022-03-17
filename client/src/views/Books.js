import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Avatar, Space, Divider, Spin, Alert } from "antd";

const Books = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([
    {
      title: "book1",
      description: "this is book one",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "http://192.168.56.1:3001/api/v1/books"
        );
        setBooks(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="mt-20 text-left">
        <h3 className="text-2xl">Books</h3>
        <div className="mt-2">You can see the list of books here:</div>
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
                  actions={
                    [
                      // <IconText
                      //   icon={StarOutlined}
                      //   text="156"
                      //   key="list-vertical-star-o"
                      // />,
                      // <IconText
                      //   icon={LikeOutlined}
                      //   text="156"
                      //   key="list-vertical-like-o"
                      // />,
                      // <IconText
                      //   icon={MessageOutlined}
                      //   text="2"
                      //   key="list-vertical-message"
                      // />,
                    ]
                  }
                  extra={
                    <img
                      width={272}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
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
