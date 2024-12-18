import { describe, expect, vi } from 'vitest';
import { useZone } from './useZone';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { ZoneResult } from '../models/zone.dto';

vi.mock('axios');

const mockedAxios = axios as typeof axios;

const mockZoneResult: ZoneResult = {
  id: '123',
  name: 'example.com',
  development_mode: 7200,
  original_name_servers: ['ns1.example.com', 'ns2.example.com'],
  original_registrar: 'GoDaddy',
  original_dnshost: 'Cloudflare',
  created_on: '2022-01-01T00:00:00.000Z',
  modified_on: '2022-01-01T00:00:00.000Z',
  activated_on: '2022-01-01T00:00:00.000Z',
  owner: {
    id: '123',
    type: 'user',
    name: '',
  },
  account: {
    id: '',
    name: '',
  },
  meta: {
    cdn_only: false,
    custom_certificate_quota: 0,
    dns_only: false,
    foundation_dns: false,
    page_rule_quota: 0,
    phishing_detected: false,
    step: 0,
  },
  vanity_name_servers: [],
};

afterEach(() => {
  vi.clearAllMocks();
});

describe('fetchZone', () => {
  describe('useZone - happy path', () => {
    it('should fetch zone data', async () => {
      mockedAxios.get = vi.fn().mockResolvedValue({
        data: mockZoneResult, // Your mocked data structure
      });

      const queryClient = new QueryClient();

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      const { result } = renderHook(() => useZone(), {
        wrapper,
      });
      await waitFor(() => expect(result.current.data).toEqual(mockZoneResult));

      // expect(result).toEqual(mockZoneResult);
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/zone');
    });
  });

  describe('fetchZone - unhappy path', () => {
    it('should throw an error when API call fails', async () => {
      const expectedError = '["fetchZone"] data is undefined';
      mockedAxios.get = vi.fn().mockResolvedValue(new Error());

      const queryClient = new QueryClient();

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      const { result } = renderHook(() => useZone(), {
        wrapper,
      });

      await waitFor(() => {
        // Check if the error is set
        expect(result.current.error?.message).toEqual(expectedError);
      });
      // Log the entire result to inspect it

      // Check if the hook is in an error state and the error is correctly captured
      // expect(result.current.error).toEqual(mockError);
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/zone');
    });
  });
});
