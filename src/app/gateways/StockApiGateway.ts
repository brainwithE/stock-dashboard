/**
 * Gateway for the AlphaVantage Stock API
 */
import moment from 'moment';
import request from 'utils/request';

/**
 * Search Stock
 * @returns {Promise<any>}
 */
export async function searchStock(ticker) {
  return await request(
    `${process.env.REACT_APP_FINNHUB_BASE_URL}/search?exchange=US&q=${ticker}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`,
    {
      method: 'GET',
    },
  );
}

/**
 * Get Quote
 * @returns {Promise<any>}
 */
export async function getQuote(ticker) {
  return await request(
    `${process.env.REACT_APP_FINNHUB_BASE_URL}/quote?symbol=${ticker}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`,
    {
      method: 'GET',
    },
  );
}

/**
 * Get Candle Chart
 * @returns {Promise<any>}
 */
export async function getCandleChart(ticker) {
  const toDate = moment().unix();
  const fromDate = moment().subtract(1, 'year').unix();

  return await request(
    `${process.env.REACT_APP_FINNHUB_BASE_URL}/stock/candle?symbol=${ticker}&resolution=M&from=${fromDate}&to=${toDate}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`,
    {
      method: 'GET',
    },
  );
}

/**
 * Get Company Profile
 * @returns {Promise<any>}
 */
export async function getCompanyProfile(ticker) {
  return await request(
    `${process.env.REACT_APP_FINNHUB_BASE_URL}/stock/profile2?symbol=${ticker}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`,
    {
      method: 'GET',
    },
  );
}
