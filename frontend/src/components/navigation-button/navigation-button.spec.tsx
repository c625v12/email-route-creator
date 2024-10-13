import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useAtom } from 'jotai';
import { useFormContext } from 'react-hook-form';
import { usePostEmailRoutes } from '../../hooks/usePostEmailRoutes';
import NavigationButton from './navigation-button';
import { Mock } from 'vitest';
import { useEmailRoutes } from '../../hooks/UseEmailRoutes';

// Mocking dependencies
vi.mock('jotai');
vi.mock('react-hook-form');
vi.mock('../../hooks/usePostEmailRoutes');
vi.mock('../../hooks/useEmailRoutes');

describe('NavigationButton', () => {
  const mockSetLoading = vi.fn();
  const mockSetNewEmail = vi.fn();
  const mockMutate = vi.fn();
  const mockRefetch = vi.fn().mockResolvedValue({ data: ['test@example.com'] });

  beforeEach(() => {
    (useAtom as Mock)
      .mockReturnValueOnce([false, mockSetLoading])
      .mockReturnValueOnce(['new@example.com', mockSetNewEmail]);
    (useFormContext as Mock).mockReturnValue({
      handleSubmit: (fn: unknown) => fn,
      getValues: () => ({
        input: 'test@example.com',
        selection: 'destination',
      }),
      reset: vi.fn(),
    });
    (usePostEmailRoutes as Mock).mockReturnValue({ mutate: mockMutate });
    (useEmailRoutes as Mock).mockReturnValue({ refetch: mockRefetch });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(<NavigationButton label="Submit" />);
    expect(baseElement).toBeTruthy();
  });

  it('should call handleClick on button click', async () => {
    render(<NavigationButton label="Submit" />);
    const button = screen.getByText('Submit');
    fireEvent.click(button);

    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockMutate).toHaveBeenCalledWith(
      { email: 'test@example.com', destination: 'destination' },
      expect.any(Object)
    );
  });

  it('should display new email and copy to clipboard', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    });
    mockMutate.mockImplementation(
      (_: unknown, { onSuccess }: { onSuccess: () => void }) => {
        onSuccess();
      }
    );
    mockRefetch.mockResolvedValue({ data: ['new@example.com'] });

    render(<NavigationButton label="Submit" />);
    const button = screen.getByText('Submit');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockRefetch).toHaveReturnedWith({ data: ['new@example.com'] });
      expect(mockSetNewEmail).toHaveBeenCalledWith('new@example.com');

      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });

    const copyButton = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(copyButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'new@example.com'
    );
  });
});
