/**
 *
 * StockProvider
 */
import * as React from 'react';

import {
  searchStock as searchStockApi,
  getQuote as getQuoteApi,
  getCandleChart as getCandleChartApi,
  getCompanyProfile as getCompanyProfileApi,
} from 'app/gateways/StockApiGateway';

interface Props {
  children: React.ReactNode;
}

const StockContext = React.createContext<any>({});

export function useStock() {
  return React.useContext(StockContext);
}

export function StockProvider(props: Props): JSX.Element {
  const [searchMatches, setSearchMatches] = React.useState<any>([]);
  const [selectedStock, setSelectedStock] = React.useState<any>({});
  const [latestStockData, setLatestStockData] = React.useState<any>([]);
  const [chartData, setChartData] = React.useState<any>({});
  const [companyProfile, setCompanyProfile] = React.useState<any>({});

  const searchStock = async ticker => {
    try {
      const searchResult = await searchStockApi(ticker);
      const result = searchResult.result.filter(
        search => !search.symbol.includes('.'),
      );

      setSearchMatches(result);
    } catch (e) {
      console.log(e);
    }
  };

  const getQuote = async ticker => {
    try {
      const data = await getQuoteApi(ticker);
      data.symbol = ticker;

      const quoteList = [data, ...latestStockData];

      setLatestStockData(quoteList.slice(0, 10));
    } catch (e) {
      console.log(e);
    }
  };

  const getCandleChart = async ticker => {
    try {
      const data = await getCandleChartApi(ticker);
      setChartData(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getCompanyProfile = async ticker => {
    try {
      const data = await getCompanyProfileApi(ticker);

      setCompanyProfile(data);
    } catch (e) {
      console.log(e);
    }
  };

  const selectStock = stockData => {
    setSelectedStock(stockData);
  };

  return (
    <StockContext.Provider
      value={{
        searchStock,
        selectStock,
        getQuote,
        getCandleChart,
        getCompanyProfile,
        searchMatches,
        selectedStock,
        latestStockData,
        chartData,
        companyProfile,
      }}
    >
      {props.children}
    </StockContext.Provider>
  );
}
