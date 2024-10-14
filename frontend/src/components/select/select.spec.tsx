// select.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Mock, vi } from 'vitest';
import { useFormContext } from 'react-hook-form';
import Select from './select';

vi.mock('react-hook-form', () => ({
  useFormContext: vi.fn(),
}));

const mockSetValue = vi.fn();
const mockWatch = vi.fn().mockReturnValue('');
const mockErrors = {};

(useFormContext as Mock).mockReturnValue({
  register: vi.fn(),
  setValue: mockSetValue,
  watch: mockWatch,
  formState: { errors: mockErrors },
});

describe('Select Component', () => {
  it('renders correctly and handles selection', () => {
    const options = ['Option 1', 'Option 2'];
    render(<Select label="Test Label" options={options} />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();

    const dropdown = screen.getByDisplayValue('Select a Destination Email');
    expect(dropdown).toBeInTheDocument();

    fireEvent.click(dropdown);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Option 1'));

    expect(mockSetValue).toHaveBeenCalledWith('selection', 'Option 1');
  });

  it('should display error message when errors.input is present', () => {
    const options = ['Option 1', 'Option 2'];

    const mockErrors = {
      selection: {
        message: 'This is a test error message',
      },
    };

    (useFormContext as Mock).mockReturnValue({
      register: vi.fn(),
      setValue: mockSetValue,
      watch: mockWatch,
      formState: { errors: mockErrors },
    });

    render(<Select label="Test Label" options={options} />);

    const errorMessage = screen.getByText('This is a test error message');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('p-error');
  });
});
