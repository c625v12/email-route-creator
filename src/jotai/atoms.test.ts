import { getDefaultStore, Provider, useAtom } from 'jotai';
import { renderHook, act } from '@testing-library/react';
import {
  domainAtom,
  emailRouteAtom,
  destinationEmailAtom,
  isLoadingAtom,
  newEmailRouteAtom,
  emailRoutesAtom,
} from './atoms';

describe('Jotai Atoms', () => {
  it('should initialize domainAtom with an empty string', () => {
    const { result } = renderHook(() => useAtom(domainAtom), {
      wrapper: Provider,
    });
    const [domain] = result.current;
    expect(domain).toBe('');
  });

  it('should initialize emailRouteAtom with an empty string', () => {
    const { result } = renderHook(() => useAtom(emailRouteAtom), {
      wrapper: Provider,
    });
    const [emailRoute] = result.current;
    expect(emailRoute).toBe('');
  });

  it('should initialize destinationEmailAtom with undefined', () => {
    const { result } = renderHook(() => useAtom(destinationEmailAtom), {
      wrapper: Provider,
    });
    const [destinationEmail] = result.current;
    expect(destinationEmail).toBeUndefined();
  });

  it('should initialize isLoadingAtom with false', () => {
    const { result } = renderHook(() => useAtom(isLoadingAtom), {
      wrapper: Provider,
    });
    const [isLoading] = result.current;
    expect(isLoading).toBe(false);
  });

  it('should initialize newEmailRouteAtom with an empty string', () => {
    const { result } = renderHook(() => useAtom(newEmailRouteAtom), {
      wrapper: Provider,
    });
    const [newEmailRoute] = result.current;
    expect(newEmailRoute).toBe('');
  });

  it('should initialize emailRoutesAtom with an empty array', () => {
    const { result } = renderHook(() => useAtom(emailRoutesAtom), {
      wrapper: Provider,
    });
    const [emailRoutes] = result.current;
    expect(emailRoutes).toEqual([]);
  });

  it('should update domainAtom value', () => {
    const { result } = renderHook(() => useAtom(domainAtom), {
      wrapper: Provider,
    });
    const [, setDomain] = result.current;
    act(() => setDomain('example.com'));
    const [domain] = result.current;
    expect(domain).toBe('example.com');
  });

  it('should update emailRouteAtom value', () => {
    const { result } = renderHook(() => useAtom(emailRouteAtom), {
      wrapper: Provider,
    });
    const [, setEmailRoute] = result.current;
    act(() => setEmailRoute('route@example.com'));
    const [emailRoute] = result.current;
    expect(emailRoute).toBe('route@example.com');
  });

  it('should update destinationEmailAtom value', () => {
    const { result } = renderHook(() => useAtom(destinationEmailAtom), {
      wrapper: Provider,
    });
    const [, setDestinationEmail] = result.current;
    act(() => setDestinationEmail('destination@example.com'));
    const [destinationEmail] = result.current;
    expect(destinationEmail).toBe('destination@example.com');
  });

  it('should update isLoadingAtom value', () => {
    const { result } = renderHook(() => useAtom(isLoadingAtom), {
      wrapper: Provider,
    });
    const [, setIsLoading] = result.current;
    act(() => setIsLoading(true));
    const [isLoading] = result.current;
    expect(isLoading).toBe(true);
  });

  it('should update newEmailRouteAtom value', () => {
    const { result } = renderHook(() => useAtom(newEmailRouteAtom), {
      wrapper: Provider,
    });
    const [, setNewEmailRoute] = result.current;
    act(() => setNewEmailRoute('newroute@example.com'));
    const [newEmailRoute] = result.current;
    expect(newEmailRoute).toBe('newroute@example.com');
  });

  it('should update emailRoutesAtom value', () => {
    const { result } = renderHook(() => useAtom(emailRoutesAtom), {
      wrapper: Provider,
    });
    const [, setEmailRoutes] = result.current;
    act(() => setEmailRoutes(['route1@example.com', 'route2@example.com']));
    const [emailRoutes] = result.current;
    expect(emailRoutes).toEqual(['route1@example.com', 'route2@example.com']);
  });
});
