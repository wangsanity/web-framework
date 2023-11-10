import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { Dialog } from './dialog';

describe('Dialog', () => {
  const defaultProps = {
    visible: true,
    title: 'Dialog Title',
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
    const { getByText } = render(<Dialog {...defaultProps}>Dialog Content</Dialog>);
    expect(getByText('Dialog Title')).toBeInTheDocument();
  });

  it('should render the dialog with the correct content', () => {
    const { getByText } = render(<Dialog {...defaultProps}>Dialog Content</Dialog>);
    expect(getByText('Dialog Content')).toBeInTheDocument();
  });

  it('should call the onClose function when the close button is clicked', () => {
    const { getByTitle } = render(<Dialog {...defaultProps}>Dialog Content</Dialog>);
    const closeButton = getByTitle('Close');
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('should call the onOk function when the OK button is clicked', () => {
    const { getByText } = render(<Dialog {...defaultProps}>Dialog Content</Dialog>);
    const okButton = getByText('OK');
    fireEvent.click(okButton);
    expect(defaultProps.onOk).toHaveBeenCalledTimes(1);
  });

  it('should call the onCancel function when the Cancel button is clicked', () => {
    const { getByText } = render(<Dialog {...defaultProps}>Dialog Content</Dialog>);
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it('should disable the OK button when isLoading prop is true', () => {
    const { getByText } = render(<Dialog {...defaultProps} isLoading />);
    const okButton = getByText('OK') as HTMLButtonElement;
    expect(okButton.disabled).toBe(true);
  });

  it('should disable the Cancel button when isLoading prop is true', () => {
    const { getByText } = render(<Dialog {...defaultProps} isLoading />);
    const cancelButton = getByText('Cancel') as HTMLButtonElement;
    expect(cancelButton.disabled).toBe(true);
  });
});