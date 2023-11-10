import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { CityPicker } from './city-picker';

describe('CityPicker', () => {
  const defaultProps = {
    addressCode: '',
  };

  it('should render the city picker with the correct default values', () => {
    const text = 'Display text';
    const { getByText } = render(
      <CityPicker {...defaultProps}>{text}</CityPicker>
    );
    expect(getByText(text)).toBeInTheDocument();
  });

  it('should show the popup when the input is clicked', () => {
    const { getByRole, getByTestId } = render(
      <CityPicker {...defaultProps} autoClose={false}>
        <input />
      </CityPicker>
    );
    const input = getByRole('textbox');
    fireEvent.click(input);
    expect(getByTestId('city-picker-confirm')).toBeInTheDocument();
  });

  it('should update the current area when an area is selected', () => {
    const onSelect = jest.fn();
    const { getByRole, getByText } = render(
      <CityPicker {...defaultProps} confirmEvent={onSelect}>
        <input />
      </CityPicker>
    );
    const input = getByRole('textbox');
    fireEvent.click(input);
    const province = getByText('北京市');
    fireEvent.click(province);
    const city = getByText('北京市');
    fireEvent.click(city);
    const area = getByText('东城区');
    fireEvent.click(area);
    expect(onSelect).toHaveBeenCalledTimes(1)
  });
});
