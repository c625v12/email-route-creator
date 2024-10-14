import { render, screen } from '@testing-library/react';
import { useFormContext } from 'react-hook-form';
import { Mock } from 'vitest';
import Input from './input';

// Mocking dependencies
vi.mock('react-hook-form');

const mockOnBlur = vi.fn();
const mockOnClick = vi.fn();
const mockErrors = {};

beforeEach(() => {
  (useFormContext as Mock).mockReturnValue({
    register: vi.fn(),
    formState: { errors: mockErrors },
  });
});

afterEach(() => {
  vi.clearAllMocks();
});
describe('Input', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Input label="Submit" onBlur={mockOnBlur} onClick={mockOnClick} />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should display error message when errors.input is present', () => {
    const mockErrors = {
      input: {
        message: 'This is a test error message',
      },
    };

    (useFormContext as Mock).mockReturnValue({
      register: vi.fn(),
      formState: { errors: mockErrors },
    });

    render(<Input label="Submit" onBlur={mockOnBlur} onClick={mockOnClick} />);

    const errorMessage = screen.getByText('This is a test error message');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('p-error');
  });
});
