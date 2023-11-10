import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { ConfirmDialog } from './confirm-dialog';

describe('ConfirmDialog', () => {
  const defaultProps = {
    visible: true,
    title: 'Are you sure?',
    showOkButton: true,
    showCancelButton: true,
    okButtonText: 'OK',
    cancelButtonText: 'Cancel',
    isLoading: false,
    onClose: jest.fn(),
    onOk: jest.fn(),
    onCancel: jest.fn(),
  };

  it('should render the dialog with the correct title', () => {
    const { getByText } = render(<ConfirmDialog {...defaultProps} />);
    expect(getByText('Are you sure?')).toBeInTheDocument();
  });

  it('should call the onClose function when the close button is clicked', () => {
    const { getByTitle } = render(<ConfirmDialog {...defaultProps} />);
    const closeButton = getByTitle('Close');
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('should call the onOk function when the OK button is clicked', () => {
    const { getByText } = render(<ConfirmDialog {...defaultProps} />);
    const okButton = getByText('OK');
    fireEvent.click(okButton);
    expect(defaultProps.onOk).toHaveBeenCalledTimes(1);
  });

  it('should call the onCancel function when the Cancel button is clicked', () => {
    const { getByText } = render(<ConfirmDialog {...defaultProps} />);
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it('should disable the OK button when isLoading prop is true', () => {
    const { getByText } = render(<ConfirmDialog {...defaultProps} isLoading />);
    const okButton = getByText('OK') as HTMLButtonElement;
    expect(okButton.disabled).toBe(true);
  });

  it('should disable the Cancel button when isLoading prop is true', () => {
    const { getByText } = render(<ConfirmDialog {...defaultProps} isLoading />);
    const cancelButton = getByText('Cancel') as HTMLButtonElement;
    expect(cancelButton.disabled).toBe(true);
  });
});