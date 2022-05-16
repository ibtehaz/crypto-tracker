import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosByUUIDQuery, useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
  //Simplified version gives the curated list, otherwise display 100 coins
  let queryString;
  const count = simplified ? queryString="" : 100;

  if (simplified) {

    //Searching by UUID of each coin rather than by symbol.
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

      }
    ]
    //Build the query string before passing it to the request builder.
    preferred.forEach(
      (coin) => {
        queryString += '&uuids[]=' + coin.uuid
      });
    var { data: cryptosList, isFetching } = useGetCryptosByUUIDQuery(queryString);
  }
  else {
    var { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  }

  // Searching by symbols can result in coins with null values making parsing difficult.
  // const { data: cryptosPrefList, isFetching } = useGetCryptoBySymbolQuery("BTC,DOGE,SHIB");

  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <div>Loading...</div>;



  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
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
                extra={<img className="crypto-image" src={currency.iconUrl} />}
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
    </>
  );
};

export default Cryptocurrencies;