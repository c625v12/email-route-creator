import { describe, expect, vi } from 'vitest';
import { useDestinationEmails } from './useDestinationEmails';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

vi.mock('axios');

const mockedAxios = axios as typeof axios;

const mockedReturn = ['email1', 'email2'];

afterEach(() => {
  vi.clearAllMocks();
});

describe('useDestinationEmails', () => {
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

      const { result } = renderHook(() => useDestinationEmails(), {
        wrapper,
      });
      await waitFor(() => expect(result.current.data).toEqual(mockedReturn));

      // expect(result).toEqual(mockZoneResult);
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:8080/destination-emails'
      );
    });
  });
  describe('unhappy path', () => {
    it('should throw an error when API call fails', async () => {
      const expectedError = '["destinationEmails"] data is undefined';
      mockedAxios.get = vi.fn().mockResolvedValue(new Error());

      const queryClient = new QueryClient();

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      const { result } = renderHook(() => useDestinationEmails(), {
        wrapper,
      });

      await waitFor(() => {
        expect(result.current.error?.message).toEqual(expectedError);
      });

      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:8080/destination-emails'
      );
    });
  });
});
