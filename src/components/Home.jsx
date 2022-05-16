import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies } from "../components";

const { Title, Paragraph } = Typography;
const Home = () => {
  // create hook to get data from api
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  if (isFetching) return <div>Loading...</div>;

  return (
    <>
      <Title level={1} className="heading">
        Global Cryptocurrency Stats
      </Title>

      {/* Ant design layoutting process is used to align elements on the page.
      Reference: https://ant.design/components/grid/ */}
      <div className="home-stats-container">
        <Row justify="space-around">
          <Col span={4}>
            <Statistic title="Total Cryptos" value={globalStats.total} />
          </Col>
          <Col span={4}>
            <Statistic
              title="Total Market Cap"
              value={millify(globalStats.totalMarketCap)}
            />
          </Col>
          <Col span={4}>
            <Statistic
              title="Total 24h Volume"
              value={millify(globalStats.total24hVolume)}
            />
          </Col>
          <Col span={4}>
            <Statistic
              title="Total Markets"
              value={millify(globalStats.totalMarkets)}
            />
          </Col>
        </Row>
      </div>


      {/* Link is a React element to change the views within the single page application */}
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Curated Coins List
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Top 100 Coins</Link>
        </Title>
      </div>

      {/* Display simple crypto list */}
      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Website Tools
        </Title>
      </div>
      {/*
      <a> element is used here because Link is primarily used to route within the single page application.
  */}
      <Title level={3}>
        <a target="_blank" rel="noopener noreferrer" href="https://reactjs.org/">React</a>
      </Title>
      <Paragraph>
        Javascript library that was released on May 29, 2013. It is maintained by Meta and has a massive developer community. It is one of the most popular libraries used to develop websites.
      </Paragraph>
      <Title level={3}>
        <a target="_blank" rel="noopener noreferrer" href="https://rapidapi.com/Coinranking/api/coinranking1">Coinranking API</a>
      </Title>
      <Paragraph>
        Simple cryptocurrency API to see real time prices and historical data on thousands of coins. This relies on heavily on Coinranking to get information about different cryptocurrencies.
      </Paragraph>
      <Title level={3}>
        <a target="_blank" rel="noopener noreferrer" href="https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/bing-news-search1">Bing News API</a>
      </Title>
      <Paragraph>
        An AI service from Microsoft Azure that turns any app into a news search resource. Used on this site to bring news related to crypto.
      </Paragraph>
      <Title level={3}>
        <a target="_blank" rel="noopener noreferrer" href="https://www.netlify.com/">Netlify</a>
      </Title>
      <Paragraph>
        Enables easy deployment of a website from a Github repository.
      </Paragraph>
    </>
  );
};

export default Home;
