/**
 *
 * Dashboard
 *
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { AppBarHeader } from 'app/components/AppBarHeader';
import { Container, Divider, Grid } from '@mui/material';

import { useStock } from 'app/providers/StockProvider';
import { StockDataTable } from 'app/components/StockDataTable';
import StockChart from 'app/components/StockChart';
import { NoData } from 'app/components/NoData';
import { CompanyInfo } from 'app/components/CompanyInfo';

interface Props {}

export function Dashboard(props: Props) {
  const { latestStockData, companyProfile } = useStock();

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Stock market dashboard" />
      </Helmet>

      <AppBarHeader />

      <Container maxWidth="lg" sx={{ paddingTop: '3em', paddingBottom: '3em' }}>
        <NoData
          isHidden={
            latestStockData.length !== 0 ||
            Object.keys(companyProfile).length !== 0
          }
        />

        <Grid container>
          <Grid item sm={4}>
            <CompanyInfo company={companyProfile} />
          </Grid>
          <Grid item sm={8}>
            <StockChart />
          </Grid>
        </Grid>

        <Divider sx={{ margin: '3em 0' }} />

        <StockDataTable list={latestStockData} />
      </Container>
    </>
  );
}
