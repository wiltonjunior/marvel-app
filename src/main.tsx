import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from '@/containers/Layout';

import Home from '@/pages/Home';
import Detail from '@/pages/Detail';
import NoMatch from '@/pages/NoMatch';
// const Home = React.lazy(() => import("@/pages/Home"));
// const Detail = React.lazy(() => import("@/pages/Detail"));

import './global.css'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/detail/:id"
              element={<Detail />}
            />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
