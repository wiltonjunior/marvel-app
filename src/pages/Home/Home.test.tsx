import { StrictMode } from 'react'
import MockAdapter from 'axios-mock-adapter'
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import api from '@/core/api';
import Layout from '@/containers/Layout';
import characters from '@/mocks/characters';

import Home from "./Home";

const env = import.meta.env;

const server = new MockAdapter(api);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
});

const Component = () => {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Layout>
                        <Home />
                    </Layout>
                </BrowserRouter>
            </QueryClientProvider>
        </StrictMode>
    )
}

describe("Home", () => {
    test.only("Home component", async () => {
        server.onGet(`${env.VITE_API_URL}/public/characters`).reply(200, characters);
        const wrapper = await render(<Component />)
        await waitFor(() => {
            const children = wrapper.getAllByTestId(/character/i)
            expect(children).toHaveLength(20);
        })
    });
});