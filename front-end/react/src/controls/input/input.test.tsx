import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { Input } from './input';

describe('Input', () => {
  it('should render the input with the correct value', () => {
    const { getByRole } = render(<Input value="hello" />);
    const input = getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('hello');
  });

  it('should call the onChange function when the input value changes', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<Input onChange={handleChange} />);
    const input = getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('hello');
  });

  it('should show the clear button when showClearButton prop is true and with some value', () => {
    const { getByTestId } = render(
      <Input showClearButton={true} value="text" />
    );
    const clearButton = getByTestId('clearBtn');
    expect(clearButton).toBeInTheDocument();
  });

  it('should call the onClear function when the clear button is clicked', () => {
    const handleClear = jest.fn();
    const { getByTestId } = render(<Input showClearButton onClear={handleClear} value="text" />);
    const clearButton = getByTestId('clearBtn');
    fireEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('should show the error message when showError prop is true', () => {
    const { getByText } = render(<Input showError errorMessage="Invalid input" />);
    expect(getByText('Invalid input')).toBeInTheDocument();
  });
});