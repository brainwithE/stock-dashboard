/**
 *
 * AppBarHeader
 *
 */

import React, { memo } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';

import { useStock } from 'app/providers/StockProvider';
import { Autocomplete, Container, TextField } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ROOT_PATH } from 'app/constants/route';

interface Props {}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  color: 'inherit',
  paddingLeft: '2em',
  border: 0,

  '& .MuiOutlinedInput-notchedOutline': {
    display: 'none',
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export const AppBarHeader = memo((props: Props) => {
  const {
    searchStock,
    getQuote,
    getCandleChart,
    getCompanyProfile,
    selectStock,
    searchMatches,
  } = useStock();

  const handleSearchStock = event => {
    debouncedSearch(event.target.value);
  };

  const debouncedSearch = debounce(symbol => {
    searchStock(symbol);
  }, 500);

  const handleSelectStock = (_, stockData) => {
    selectStock(stockData);
    getQuote(stockData.symbol);
    getCandleChart(stockData.symbol);
    getCompanyProfile(stockData.symbol);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Link
              to={ROOT_PATH}
              color="inherit"
              underline="none"
              component={RouterLink}
            >
              <Typography variant="h6" noWrap component="div">
                Stock App
              </Typography>
            </Link>

            <Autocomplete
              disablePortal
              options={searchMatches}
              filterOptions={option => option}
              getOptionLabel={option => option.symbol}
              renderOption={(props, option) => {
                return (
                  <Box component="li" {...props}>
                    <b>{option.symbol}</b> - {option.description}
                  </Box>
                );
              }}
              sx={{ width: '50%' }}
              onChange={handleSelectStock}
              renderInput={params => (
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledTextField
                    {...params}
                    placeholder="Search Stock Code (E.G. IBM)"
                    onChange={handleSearchStock}
                  />
                </Search>
              )}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
});
