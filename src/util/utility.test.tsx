import { describe, it, expect } from 'vitest';
import {
  stringNotInArrayValidator,
  emailFormatter,
  handleControlClick,
  checkString,
} from './utility';

describe('stringNotInArrayValidator', () => {
  it('should return true if email is not in disallowedValues after formatting', () => {
    const disallowedValues = ['test.123456@domain.com'];
    const domain = 'domain.com';
    const email = 'testgood.123456@domain.com';
    expect(stringNotInArrayValidator(disallowedValues, domain, email)).toEqual(
      false
    );
  });

  it('should return false if email is in disallowedValues after formatting', () => {
    const disallowedValues = ['test.123456@domain.com'];
    const domain = 'domain.com';
    const email = 'test.123456@domain.com';
    expect(stringNotInArrayValidator(disallowedValues, domain, email)).toBe(
      true
    );
  });

  it('should return undefined if email is not valid', () => {
    const disallowedValues = ['test.123456@domain.com'];
    const domain = 'domain.com';
    const email = '';
    expect(stringNotInArrayValidator(disallowedValues, domain, email)).toBe(
      undefined
    );
  });
});

describe('emailFormatter', () => {
  it('should format email with random digits if domain is different', () => {
    const control = 'test@otherdomain.com';
    const domain = 'domain.com';
    const formattedEmail = emailFormatter(control, domain);
    expect(formattedEmail).toMatch('test@domain.com');
  });

  it('should format email with random digits if no domain is present', () => {
    const control = 'test';
    const domain = 'domain.com';
    const formattedEmail = emailFormatter(control, domain);
    expect(formattedEmail).toMatch(/test\.\d{6}@domain\.com/);
  });

  it('should return the same email if domain is already correct', () => {
    const control = 'test';
    const domain = 'domain.com';
    expect(emailFormatter(control, domain)).toMatch(/test\.\d{6}@domain\.com/);
  });
});

describe('handleControlClick', () => {
  it('should return undefined if email is undefined', () => {
    const email = undefined;
    const domain = 'domain.com';
    expect(handleControlClick(email, domain)).toBe(undefined);
  });

  it('should return the same email if domain is not included', () => {
    const email = 'test@otherdomain.com';
    const domain = 'domain.com';
    expect(handleControlClick(email, domain)).toBe('test@otherdomain.com');
  });

  it('should return truncated email if domain is included', () => {
    const email = 'test.123456@domain.com';
    const domain = 'domain.com';
    expect(handleControlClick(email, domain)).toBe('test');
  });
});

describe('checkString', () => {
  it('should return undefined if email is empty', () => {
    const result = checkString('', 'example.com');
    expect(result).toBeUndefined();
  });

  it('should return undefined if email does not contain the domain', () => {
    const result = checkString('user@anotherdomain.com', 'example.com');
    expect(result).toBeUndefined();
  });

  it('should return undefined if email contains the domain but does not have two dots', () => {
    const result = checkString('user@example.com', 'example.com');
    expect(result).toBeUndefined();
  });

  it('should return the substring if email contains the domain and has two dots', () => {
    const result = checkString('user.name@example.com', 'example.com');
    expect(result).toBe('user');
  });

  it('should return the substring if email contains the domain and has more than two dots', () => {
    const result = checkString('user.name.surname@example.com', 'example.com');
    expect(result).toBe('user.name');
  });
});
