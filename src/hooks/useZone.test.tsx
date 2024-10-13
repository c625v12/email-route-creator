import { describe, expect, vi } from 'vitest';
import { useZone } from './useZone';
import { ZoneResult } from 'src/models/zone.dto';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

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
  it('should fetch zone data', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue({
      data: mockZoneResult, // Your mocked data structure
    });

    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useZone(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.data).toEqual(mockZoneResult));

    // expect(result).toEqual(mockZoneResult);
    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:3000/api/cloudflare/zone'
    );
  });
});
