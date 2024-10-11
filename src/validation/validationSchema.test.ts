import { describe, it, expect, vi } from 'vitest';
import { inputValidationSchema } from './validationSchema';

// Mock the useEmailRouteValidator function
vi.mock('../hooks/useEmailRouteValidator', () => ({
  default: vi.fn(),
}));

describe('inputValidationSchema', () => {
  it('should invalidate an invalid email format', async () => {
    const invalidEmailData = {
      input: 'invalid-email',
      selection: 'some selection',
    };
    await expect(
      inputValidationSchema.validate(invalidEmailData)
    ).rejects.toThrow('Invalid email format');
  });

  it('should invalidate missing input', async () => {
    const missingInputData = { selection: 'some selection' };
    await expect(
      inputValidationSchema.validate(missingInputData)
    ).rejects.toThrow('Input is required');
  });

  it('should invalidate missing selection', async () => {
    const missingSelectionData = { input: 'test@example.com' };
    await expect(
      inputValidationSchema.validate(missingSelectionData)
    ).rejects.toThrow('Input is required');
  });
});
