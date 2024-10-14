import { render } from '@testing-library/react';

import Home from './home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('Home', () => {
  it('should render successfully', () => {
    const queryClient = new QueryClient();

    const { baseElement } = render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
