import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('should render the button with the correct text', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('should call the onClick function when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>
    );
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should disable the button when disabled prop is true', () => {
    const { getByText } = render(<Button disabled>Click me</Button>);
    expect(getByText('Click me')).toBeDisabled();
  });

  it('should show a loading spinner when isLoading prop is true', () => {
    const { getByTestId } = render(<Button isLoading>Click me</Button>);
    expect(getByTestId('spinner')).toBeInTheDocument();
  });
});
