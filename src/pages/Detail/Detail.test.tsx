import { StrictMode } from 'react'
import MockAdapter from 'axios-mock-adapter'
import { render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import api from '@/core/api';
import Layout from '@/containers/Layout';

import comics from '@/mocks/comics';
import characterById from '@/mocks/characterById';

import Detail from "./Detail";

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
                    <MemoryRouter initialEntries={["/detail/1010354"]}>
                        <Routes>
                            <Route path="/detail/:id" element={<Layout><Detail /></Layout>} />
                        </Routes>
                    </MemoryRouter>
            </QueryClientProvider>
        </StrictMode>
    )
}

describe("Detail", () => {
    test.only("Detail component", async () => {
        server.onGet(`${env.VITE_API_URL}/public/characters/1010354`).reply(200, characterById);
        server.onGet(`${env.VITE_API_URL}/public/characters/1010354/comics`).reply(200, comics);
        const wrapper = await render(<Component />)
        await waitFor(() => {
            const children = wrapper.getAllByTestId(/comic/i)
            expect(children).toHaveLength(6);
        })
    });
});