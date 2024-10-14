import { render, screen, fireEvent } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import EmailInput from './EmailInput';
import { useFormContext, FormProvider, useForm } from 'react-hook-form';
import { useZone } from '../../hooks/useZone';
import { emailFormatter, handleControlClick } from '../../util/utility';
import { useAtom } from 'jotai';
import { useEmailRoutes } from '../../hooks/UseEmailRoutes';

// Mock the necessary modules and hooks
vi.mock('react-hook-form', () => ({
  useFormContext: vi.fn(),
  FormProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useForm: vi.fn(),
  register: vi.fn(),
}));

vi.mock('../../hooks/useZone', () => ({
  useZone: vi.fn(),
}));

vi.mock('../../hooks/useEmailRoutes', () => ({
  useEmailRoutes: vi.fn(),
}));

vi.mock('jotai');

vi.mock('../../util/utility', () => ({
  emailFormatter: vi.fn(),
  handleControlClick: vi.fn(),
}));

describe('EmailInput Component', () => {
  const mockSetEmailRoutes = vi.fn();
  const mockGetValues = vi.fn().mockReturnValue({
    input: 'test@example.com',
    selection: 'destination',
  });
  const mockSetValue = vi.fn();
  const mockTrigger = vi.fn();
  const mockRegister = vi.fn();

  const mockFormMethods = {
    getValues: mockGetValues,
    setValue: mockSetValue,
    trigger: mockTrigger,
    register: mockRegister,
    formState: { errors: {} },
    errors: {},
  };

  beforeEach(() => {
    // Mock form context
    (useFormContext as Mock).mockReturnValue(mockFormMethods);

    // Mock hooks
    (useZone as Mock).mockReturnValue({
      data: {
        name: 'example.com',
      },
    });

    (useEmailRoutes as Mock).mockReturnValue({
      data: ['route1', 'route2'],
    });

    (useAtom as Mock).mockReturnValue([
      ['route1', 'route2'],
      mockSetEmailRoutes,
    ]);

    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('should render the EmailInput component', () => {
    // Mock form methods
    const formMethods = useForm(); // Initialize form methods using react-hook-form

    render(
      <FormProvider {...formMethods}>
        <EmailInput />
      </FormProvider>
    );
    const label = screen.getByText('New Email Prefix');
    expect(label).toBeInTheDocument();
  });

  it('should handle onBlur event', () => {
    mockGetValues.mockReturnValueOnce({ input: 'test' });
    (emailFormatter as Mock).mockReturnValue('formatted@example.com');
    const formMethods = useForm(); // Initialize form methods using react-hook-form

    render(
      <FormProvider {...formMethods}>
        <EmailInput />
      </FormProvider>
    );

    const input = screen.getByRole('button');
    fireEvent.blur(input);

    expect(mockTrigger).toHaveBeenCalledWith('input');
    expect(mockSetValue).toHaveBeenCalledWith('input', 'formatted@example.com');
  });

  it('should handle onClick event', () => {
    mockGetValues.mockReturnValueOnce({ input: 'test' });
    (handleControlClick as Mock).mockReturnValue('clicked@example.com');

    render(<EmailInput />);
    const input = screen.getByRole('button');
    fireEvent.click(input);

    expect(mockSetValue).toHaveBeenCalledWith('input', 'clicked@example.com');
  });
});
