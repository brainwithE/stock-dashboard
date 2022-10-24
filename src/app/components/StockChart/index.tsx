/**
 *
 * StockChart
 *
 */
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { useStock } from 'app/providers/StockProvider';
import { transformChartData } from 'app/transformers';

export default function StockChart() {
  const { chartData } = useStock();

  if (Object.keys(chartData).length === 0) return null;

  return (
    <ResponsiveContainer>
      <LineChart
        data={transformChartData(chartData)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="open"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
