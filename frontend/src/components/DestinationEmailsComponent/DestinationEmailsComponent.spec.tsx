import { render, screen } from '@testing-library/react';

import DestinationEmailsComponent from './DestinationEmailsComponent';
import { Mock } from 'vitest';
import { useDestinationEmails } from '../../hooks/useDestinationEmails';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

vi.mock('../../hooks/useDestinationEmails', () => ({
  useDestinationEmails: vi.fn(),
}));

vi.mock('react-hook-form', () => ({
  useFormContext: vi.fn(),
  FormProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useForm: vi.fn(),
  register: vi.fn(),
}));

describe('DestinationEmailsComponent', () => {
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
    watch: vi.fn(),
    formState: { errors: {} },
    errors: {},
  };
  beforeEach(() => {
    (useDestinationEmails as Mock).mockReturnValue({
      data: ['email1', 'email2'],
      isLoading: false,
    });
    (useFormContext as Mock).mockReturnValue(mockFormMethods);
  });
  it('should render successfully', () => {
    const formMethods = useForm(); // Initialize form methods using react-hook-form

    const { baseElement } = render(
      <FormProvider {...formMethods}>
        <DestinationEmailsComponent />
      </FormProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});

describe('DestinationEmailsComponent', () => {
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
    watch: vi.fn(),
    formState: { errors: {} },
    errors: {},
  };
  beforeEach(() => {
    (useDestinationEmails as Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });
    (useFormContext as Mock).mockReturnValue(mockFormMethods);
  });
  it('should render successfully', () => {
    const formMethods = useForm(); // Initialize form methods using react-hook-form

    const { baseElement } = render(
      <FormProvider {...formMethods}>
        <DestinationEmailsComponent />
      </FormProvider>
    );
    expect(baseElement).toBeTruthy();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

describe('DestinationEmailsComponent', () => {
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
    watch: vi.fn(),
    formState: { errors: {} },
    errors: {},
  };
  beforeEach(() => {
    (useDestinationEmails as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('error'),
    });
    (useFormContext as Mock).mockReturnValue(mockFormMethods);
  });
  it('should render successfully', () => {
    const formMethods = useForm(); // Initialize form methods using react-hook-form

    const { baseElement } = render(
      <FormProvider {...formMethods}>
        <DestinationEmailsComponent />
      </FormProvider>
    );
    expect(baseElement).toBeTruthy();
    expect(screen.getByText('Error: error')).toBeInTheDocument();
  });
});
