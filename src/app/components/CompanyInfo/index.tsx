/**
 *
 * CompanyInfo
 *
 */
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import moment from 'moment';
import React, { memo } from 'react';

interface Props {
  company: any;
}

export const CompanyInfo = memo((props: Props) => {
  if (Object.keys(props.company).length === 0) return null;

  return (
    <Grid container>
      <Grid container>
        <Grid item xs={2}>
          <img src={props.company.logo} alt={props.company.ticker} />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h5">{props.company.ticker}</Typography>
          <Typography variant="subtitle1">{props.company.name}</Typography>
        </Grid>
      </Grid>

      <Grid xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell scope="row">Currency </TableCell>
                <TableCell scope="row">{props.company.currency}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">Exchange </TableCell>
                <TableCell scope="row">{props.company.exchange}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">IPO </TableCell>
                <TableCell scope="row">
                  {moment(props.company.ipo).format('MM/DD/YYYY')}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">Outstanding Shares </TableCell>
                <TableCell scope="row">
                  {props.company.shareOutstanding}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
});
