import React from "react";
import { Layout, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import SendCoin from "../../component/sendCoin";
const { Header, Content, Footer, Sider } = Layout;
const items = [LogoutOutlined].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `Transfer coin`,
}));
const Home = (props) => (
  <Layout hasSider>
    <Sider
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      onCollapse={true}
      width={350}
    >
      <div className="content-nav-wallet">
        <div className="wallet">
          <div className="title-wallet">MY PERSONAL ACCOUNT</div>
          <div className="publickey-wallet">
            0x2F304301D46241573Cb302a88cf5E709e46ef460
          </div>
          <div className="balance-wallet">100</div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </div>
    </Sider>
    <Layout
      className="site-layout"
      style={{
        marginLeft: 200,
      }}
    >
      <Header
        className="site-layout-background"
        style={{
          padding: 0,
        }}
      />
      <Content
        style={{
          margin: "24px 16px 0",
          overflow: "initial",
        }}
      >
         <SendCoin/>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  </Layout>
);

export default Home;
