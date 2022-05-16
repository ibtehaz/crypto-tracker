import React from 'react';
import { Layout, Menu, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  QuestionCircleOutlined,
  BulbOutlined,
  FundOutlined,
} from "@ant-design/icons";
import icon from "../images/Bitcoin-icon.png";

const { Header } = Layout;
const Navbar = () => {
  return (
    // Ant design handles responsiveness of the Navbar. Automatically adds button hover when screen is resized.
    <Header>
      <Menu
        mode="horizontal"
        theme="dark">
        <Menu.Item>
          <Avatar src={icon} size="large" />
          <Link to="/">&nbsp;Crypto Tracker</Link>
        </Menu.Item>

        <Menu.Item icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />}>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
        <Menu.Item icon={<QuestionCircleOutlined />}>
          <Link to="/faqs">FAQs</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
