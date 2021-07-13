import { fireEvent, render, screen } from '@testing-library/react';
import UserForm from './UserForm';

describe('UserForm', () => {

    beforeEach(() => {
      render(<UserForm onSubmit={() => {}}/>);
    });

    test('renders User form', () => {
      const userFormElement = screen.getByText('User form');
      expect(userFormElement).toBeInTheDocument();
    });

    test('renders email field', () => {
      const emailLabel = screen.getByLabelText('Your Email');
      expect(emailLabel).toBeInTheDocument();
    });

    test('renders password field', () => {
      const passwordLabel = screen.getByLabelText('Your Password');
      expect(passwordLabel).toBeInTheDocument();
    });

    test('does render full name field', () => {
      const fullNameLabel = screen.queryByLabelText('Your full name');
      expect(fullNameLabel).toBeInTheDocument();
    });

    test('renders email error if email format is invalid', () => {
      const emailInput = screen.getByLabelText('email-input');
      fireEvent.change(emailInput, { target: { value: 'asfdasfd' } });
      fireEvent.focusOut(emailInput);
      const error = screen.queryByText('Please enter a valid email address.');
      expect(error).toBeInTheDocument();
    });

    test('does not render email error if email format is invalid', () => {
      const emailInput = screen.getByLabelText('email-input');
      fireEvent.change(emailInput, { target: { value: 'learner01@example.com' } });
      fireEvent.focusOut(emailInput);
      const error = screen.queryByText('Please enter a valid email address.');
      expect(error).not.toBeInTheDocument();
    });

    test('renders password error if password lenght is not equal or greater than 5 chars', () => {
      const passwordInput = screen.getByLabelText('password-input');
      fireEvent.change(passwordInput, { target: { value: '1234' } });
      fireEvent.focusOut(passwordInput);
      const error = screen.queryByText('Please enter a valid password (min length 5 characters)');
      expect(error).toBeInTheDocument();
    });

    test('does not render password error if password lenght is  equal or greater than 5 chars', () => {
      const passwordInput = screen.getByLabelText('password-input');
      fireEvent.change(passwordInput, { target: { value: '12345' } });
      fireEvent.focusOut(passwordInput);
      const error = screen.queryByText('Please enter a valid password (min length 5 characters)');
      expect(error).not.toBeInTheDocument();
    });
});