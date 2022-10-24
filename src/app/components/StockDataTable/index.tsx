/**
 *
 * StockDataTable
 *
 */
import React, { memo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { Link, Typography } from '@mui/material';

import { useStock } from 'app/providers/StockProvider';

interface Props {
  list: any;
}

export const StockDataTable = memo((props: Props) => {
  const { getCandleChart, getCompanyProfile } = useStock();

  const handleSelectStock = symbol => {
    window.scroll(0, 0);
    getCandleChart(symbol);
    getCompanyProfile(symbol);
  };

  if (props.list.length === 0) return null;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Latest available data
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ background: '#e6eef1' }}>
              <TableCell>Stock Symbol</TableCell>
              <TableCell>Last Updated Data</TableCell>
              <TableCell>Open Price</TableCell>
              <TableCell>Low Price</TableCell>
              <TableCell>High Price</TableCell>
              <TableCell>Previous Close Price</TableCell>
              <TableCell>Current Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.list.map(row => (
              <TableRow
                key={row.symbol}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  <Link onClick={() => handleSelectStock(row.symbol)}>
                    {row.symbol}
                  </Link>
                </TableCell>
                <TableCell component="th" scope="row">
                  {moment.unix(row.t).format('MM/DD/YYYY')}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography
                    variant="body1"
                    color={
                      row.o.toFixed(2) > row.pc.toFixed(2) ? 'green' : 'red'
                    }
                  >
                    {row.o}
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography
                    variant="body1"
                    color={
                      row.l.toFixed(2) > row.pc.toFixed(2) ? 'green' : 'red'
                    }
                  >
                    {row.l}
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography
                    variant="body1"
                    color={
                      row.h.toFixed(2) > row.pc.toFixed(2) ? 'green' : 'red'
                    }
                  >
                    {row.h}
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography
                    variant="body1"
                    color={
                      row.c.toFixed(2) > row.pc.toFixed(2) ? 'green' : 'red'
                    }
                  >
                    {row.pc}
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography
                    variant="body1"
                    color={
                      row.c.toFixed(2) > row.pc.toFixed(2) ? 'green' : 'red'
                    }
                  >
                    {row.c}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
});
