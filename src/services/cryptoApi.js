import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': 'e1d373f671mshff300b38927e81bp1a4b2ejsn2d7a46672372'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com/';

const createRequest = (url) => ({url, headers: cryptoApiHeaders});

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoBySymbol: builder.query({
            query: (symbol) => createRequest(`/coins?symbols=${symbol}`),
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
        })
    })
});

export const {
    useGetCryptosQuery, useGetCryptoBySymbolQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery
} = cryptoApi;
