import React, { useEffect, useState } from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic, Card } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosByUUIDQuery } from "../services/cryptoApi";

const { Title, Paragraph } = Typography;
const Home = () => {
  // create hook to get data from api
  // Searching by UUID of each coin rather than by symbol.
  const preferred = [
    {
      name: "BTC",
      uuid: "Qwsogvtv82FCd"
    },
    {
      name: "ETH",
      uuid: "razxDUgYGNAdQ"
    },
    {
      name: "XRP",
      uuid: "-l8Mn2pVlRs-p"
    },
    {
      name: "SOL",
      uuid: "zNZHO_Sjf"
    },
    {
      name: "ADA",
      uuid: "qzawljRxB5bYu"
    },
    {
      name: "DOGE",
      uuid: "a91GCGd_u96cF"
    },
    {
      name: "SHIB",
      uuid: "xz24e0BjL"
    },
    {
      name: "Bitcoin Cash",
      uuid: "ZlZpzOJo43mIo"
    },
    
  ]
  let queryString = "";
  //Build the query string before passing it to the request builder.
  preferred.forEach(
    (coin) => {
      queryString += '&uuids[]=' + coin.uuid
    });
  const { data: cryptosList, isFetching } = useGetCryptosByUUIDQuery(queryString);
  const globalStats = cryptosList?.data?.stats;
  const [cryptos, setCryptos] = useState();

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
  },[cryptosList]);

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
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >

            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img alt={currency.name} className="crypto-image" src={currency.iconUrl} />}
                hoverable
                className='ant-card'
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
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
