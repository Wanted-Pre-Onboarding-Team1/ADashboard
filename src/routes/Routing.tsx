import AppLayout from 'components/header/AppLayout';
import LandingPage from 'pages/LandingPage';
import NotFoundPage from 'pages/NotFoundPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Path from './Path';

function Routing() {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />

      <Route element={<AppLayout />}>
        <Route path={Path.ADManagementPage} element={<LandingPage />} />
        <Route path={Path.LandingPage} element={<LandingPage />} />
      </Route>
    </Routes>
  );
}

export default Routing;
