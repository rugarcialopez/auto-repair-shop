import { screen, render, fireEvent } from '@testing-library/react';
import Repair from '../../models/Repair';
import RepairForm from './RepairForm';

describe('Repair Form', () => {

  const users = [
    {
      id: '1',
      fullName: 'Learner One',
      role: 'user'
    },
    {
      id: '2',
      fullName: 'Learner Two',
      role: 'user'
    }
  ]

  beforeEach(() => {
    render(<RepairForm onSubmit={(repair: Repair) => {}} users={users}/>);
  });

  test('renders Repair form', () => {
    const repairFormElement = screen.getByText(/Repair Form/i);
    expect(repairFormElement).toBeInTheDocument();
  });

  test('renders description error if description field is empty', () => {
    const descriptionTextArea = screen.getByLabelText('description-textarea');
    fireEvent.change(descriptionTextArea, { target: { value: ''}});
    fireEvent.focusOut(descriptionTextArea);
    const error = screen.queryByText('Please enter a description.');
    expect(error).toBeInTheDocument();
  });

  test('renders date error if date field is empty', () => {
    const dateInput = screen.getByLabelText('date-input');
    fireEvent.change(dateInput, { target: { value: ''}});
    fireEvent.focusOut(dateInput);
    const error = screen.queryByText('Please enter a date.');
    expect(error).toBeInTheDocument();
  });

  test('renders time error if time field is empty', () => {
    const timeInput = screen.getByLabelText('time-input');
    fireEvent.change(timeInput, { target: { value: ''}});
    fireEvent.focusOut(timeInput);
    const error = screen.queryByText('Please enter a time.');
    expect(error).toBeInTheDocument();
  });

});