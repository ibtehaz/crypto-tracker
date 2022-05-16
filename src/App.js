import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {
  Home,
  Navbar,
  Faqs,
  Cryptocurrencies,
  News,
  CryptoDetails,
} from "./components";
import "./App.css";

const { Content } = Layout;

const App = () => {
  return (
    <Layout className="layout">
      <Navbar />
      <Content style={{ padding: '0 50px' }}>
        <div className="routes">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/faqs">
              <Faqs />
            </Route>
            <Route exact path="/cryptocurrencies">
              <Cryptocurrencies />
            </Route>
            <Route exact path="/crypto/:coinId">
              <CryptoDetails />
            </Route>
            <Route exact path="/news">
              <News />
            </Route>
          </Switch>
        </div>
      </Content>
      <div className="footer">
        <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
          Crypto Tracker <br />&copy; 2022
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/news">News</Link>
        </Space>

      </div>
    </Layout>
  );
};

export default App;
