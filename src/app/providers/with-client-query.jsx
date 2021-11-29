import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const WithClientQuery = (component) => () =>
  <QueryClientProvider client={queryClient}>{component()}</QueryClientProvider>;

export default WithClientQuery;
