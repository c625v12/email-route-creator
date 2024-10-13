import { describe, it, expect, vi } from 'vitest';
import type { Mock } from 'vitest';
import { getDefaultStore } from 'jotai';
import { stringNotInArrayValidator } from '../util/utility';
import { domainAtom, emailRoutesAtom } from '../jotai/atoms';
import useEmailRouteValidator from './useEmailRouteValidator';

vi.mock('jotai', () => ({
  getDefaultStore: vi.fn(),
}));

vi.mock('../util/utility', () => ({
  stringNotInArrayValidator: vi.fn(),
}));

vi.mock('../jotai/atoms', () => ({
  domainAtom: 'domainAtom',
  emailRoutesAtom: 'emailRoutesAtom',
}));

const mockStore = {
  get: vi.fn(),
};

describe('useEmailRouteValidator', () => {
  (getDefaultStore as Mock).mockReturnValue(mockStore);

  it('should return undefined if emailRoute is undefined', () => {
    const result = useEmailRouteValidator(undefined);
    expect(result).toBeUndefined();
  });

  it('should return undefined if emailRoutes is undefined', () => {
    mockStore.get.mockImplementation((atom) => {
      if (atom === emailRoutesAtom) return undefined;
      if (atom === domainAtom) return 'example.com';
    });

    const result = useEmailRouteValidator('test@example.com');
    expect(result).toBeUndefined();
  });

  it('should call stringNotInArrayValidator with correct arguments', () => {
    mockStore.get.mockImplementation((atom) => {
      if (atom === emailRoutesAtom) return ['route1@example.com'];
      if (atom === domainAtom) return 'example.com';
    });

    (stringNotInArrayValidator as Mock).mockReturnValue(true);

    const result = useEmailRouteValidator('test@example.com');
    expect(stringNotInArrayValidator).toHaveBeenCalledWith(
      ['route1@example.com'],
      'example.com',
      'test@example.com'
    );
    expect(result).toBe(true);
  });

  it('should return the result of stringNotInArrayValidator', () => {
    mockStore.get.mockImplementation((atom) => {
      if (atom === emailRoutesAtom) return ['route1@example.com'];
      if (atom === domainAtom) return 'example.com';
    });

    (stringNotInArrayValidator as Mock).mockReturnValue(false);

    const result = useEmailRouteValidator('test@example.com');
    expect(result).toBe(false);
  });
});
