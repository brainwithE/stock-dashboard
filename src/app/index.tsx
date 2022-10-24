/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { GlobalStyle } from 'styles/global-styles';

import { Dashboard } from './pages/Dashboard/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { ROOT_PATH } from './constants/route';
import { StockProvider } from './providers/StockProvider';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <StockProvider>
        <Routes>
          <Route path={ROOT_PATH} element={<Dashboard />} />
          <Route element={<NotFoundPage />} />
        </Routes>
      </StockProvider>

      <GlobalStyle />
    </BrowserRouter>
  );
}
