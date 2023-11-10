import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('should render the checkbox with the correct defaultChecked value', () => {
    const { getByRole } = render(<Checkbox />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it('should call the onClick function when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Checkbox onClick={handleClick} />);
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should call the onChange function', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<Checkbox onChange={handleChange} />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    fireEvent.change(checkbox, { target: { checked: true } });
    expect(checkbox.checked).toBe(true);
  });
});