import React from 'react'
import { Typography } from "antd";
import millify from 'millify';
import { useGetCryptoBySymbolQuery } from '../services/cryptoApi';

const { Title, Paragraph } = Typography;
function Faqs(){
  const { data: btc, isFetching } = useGetCryptoBySymbolQuery("BTC");
  const btcPrice = btc?.data?.coins;

  return (
    <>
      <Title level={1} className="heading faq-heading">
        Frequently Asked Questions
      </Title>

      <ol>
        <li className="faq-question" >
            <Paragraph>
              What is cryptocurrency?
            </Paragraph>
            <Paragraph className="faq-answer">
            A cryptocurrency is a digital or virtual currency that is secured by cryptography, which makes it nearly impossible to counterfeit or double-spend. Many cryptocurrencies are decentralized networks based on blockchain technology—a distributed ledger enforced by a disparate network of computers. A defining feature of cryptocurrencies is that they are generally not issued by any central authority, rendering them theoretically immune to government interference or manipulation.<a href="https://www.investopedia.com/terms/c/cryptocurrency.asp#toc-what-is-cryptocurrency" target="_blank" rel="noreferrer">[1]</a>      
            </Paragraph>
        </li>
        <li className="faq-question" >
            <Paragraph>
              What is blockchain?
            </Paragraph>
            <Paragraph className="faq-answer">
            A blockchain is a distributed database that is shared among the nodes of a computer network. As a database, a blockchain stores information electronically in digital format. Blockchains are best known for their crucial role in cryptocurrency systems, such as Bitcoin, for maintaining a secure and decentralized record of transactions. The innovation with a blockchain is that it guarantees the fidelity and security of a record of data and generates trust without the need for a trusted third party.
              <a href="https://www.investopedia.com/terms/b/blockchain.asp" target="_blank" rel="noreferrer">[2]</a>      
            </Paragraph>
        </li>

        <li className="faq-question">
          <Paragraph>
            Who invented cryptocurrency?
          </Paragraph>
          <Paragraph className="faq-answer">
            Bitcoin was the first cryptocurrency that was created by Satoshi Nakamoto. The identity of Satoshi is unknown to this day. Bitcoin and blockchain technology was explained in white paper named <a href="https://bitcoin.org/bitcoin.pdf" target="_blank" rel="noreferrer">Bitcoin: A Peer-to-Peer Electronic Cash System</a>
          </Paragraph>
        </li>

        <li className="faq-question">
          <Paragraph>
            What is the current price of Bitcoin?
          </Paragraph>
          <Paragraph className='faq-answer'>
            The current price of bitcoin is {!isFetching && (millify(btcPrice[0].price))}
          </Paragraph>
        </li>
      </ol>

    </>
    );
};

export default Faqs