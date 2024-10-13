import { describe, expect, vi } from 'vitest';
import { useEmailRoutes } from './UseEmailRoutes';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

vi.mock('axios');

const mockedAxios = axios as typeof axios;

const mockedReturn = ['email1', 'email2'];

afterEach(() => {
  vi.clearAllMocks();
});

describe('UseEmailRoutes', () => {
  describe('happy path', () => {
    it('should fetch zone data', async () => {
      mockedAxios.get = vi.fn().mockResolvedValue({
        data: mockedReturn,
      });

      const queryClient = new QueryClient();

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      const { result } = renderHook(() => useEmailRoutes(), {
        wrapper,
      });
      await waitFor(() => expect(result.current.data).toEqual(mockedReturn));

      // expect(result).toEqual(mockZoneResult);
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/emails');
    });
  });
  describe('unhappy path', () => {
    it('should throw an error when API call fails', async () => {
      const expectedError = '["fetchEmails"] data is undefined';
      mockedAxios.get = vi.fn().mockResolvedValue(new Error());

      const queryClient = new QueryClient();

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      const { result } = renderHook(() => useEmailRoutes(), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.error?.message).toEqual(expectedError);
      });

      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/emails');
    });
  });
});
