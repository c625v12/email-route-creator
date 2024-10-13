import { describe, expect, vi } from 'vitest';
import { usePostEmailRoutes } from './usePostEmailRoutes';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';

vi.mock('axios');

const mockedAxios = axios as typeof axios;

const mockEmailRouteData = {
  email: 'test@example.com',
  destination: 'destination',
};

const mockResponseData = {
  status: 200,
  data: 'mocked post',
};

afterEach(() => {
  vi.clearAllMocks();
});

describe('usePostEmailRoutes', () => {
  it('should usePostEmailRoutes data', async () => {
    mockedAxios.post = vi.fn().mockResolvedValue({
      status: 200,
      data: 'mocked post',
    });

    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => usePostEmailRoutes(), {
      wrapper,
    });
    await act(async () => {
      const { mutateAsync } = result.current;
      expect(await mutateAsync(mockEmailRouteData)).toEqual(
        mockResponseData.data
      );
    });

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/add-route/test@example.com/destination'
    );
  });

  it('should usePostEmailRoutes error', async () => {
    mockedAxios.post = vi.fn().mockResolvedValue({
      status: 500,
      data: 'mocked post',
    });

    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => usePostEmailRoutes(), {
      wrapper,
    });
    let error: Error | undefined;
    try {
      await act(async () => {
        const { mutateAsync } = result.current;
        await mutateAsync(mockEmailRouteData);
      });
    } catch (e) {
      error = e as Error;
    }

    expect(error).toBeDefined();

    expect(error?.message).toBe('Network response was not ok');
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/add-route/test@example.com/destination'
    );
  });
});
