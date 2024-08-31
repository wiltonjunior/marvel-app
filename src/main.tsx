import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

import Layout from '@/containers/Layout';

import NoMatch from '@/pages/NoMatch';
const Home = React.lazy(() => import("@/pages/Home"));
const Detail = React.lazy(() => import("@/pages/Detail"));

import './global.css'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
            path="/detail/*"
            element={<Detail />}
            />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Layout>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
