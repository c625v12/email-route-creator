import { render, screen } from '@testing-library/react';

import DomainSection from './domainSection';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useZone } from '../../hooks/useZone';
import { Mock } from 'vitest';

vi.mock('../../hooks/useZone', () => ({
  useZone: vi.fn(),
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe('DomainSection happy', () => {
  beforeEach(() => {
    (useZone as Mock).mockReturnValue({
      data: {
        name: 'example.com',
      },
      isLoading: false,
    });
  });
  it('should render successfully', () => {
    const queryClient = new QueryClient();

    const { baseElement } = render(
      <QueryClientProvider client={queryClient}>
        <DomainSection />
      </QueryClientProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});

describe('DomainSection unhappy - loading', () => {
  beforeEach(() => {
    (useZone as Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });
  });
  it('should render successfully', () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <DomainSection />
      </QueryClientProvider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

describe('DomainSection unhappy - error', () => {
  beforeEach(() => {
    (useZone as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('error'),
    });
  });
  it('should render successfully', () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <DomainSection />
      </QueryClientProvider>
    );
    expect(screen.getByText('Error: error')).toBeInTheDocument();
  });
});
