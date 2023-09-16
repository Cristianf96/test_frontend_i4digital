import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import Login from './index';

jest.mock('axios', () => ({
  request: jest.fn(),
}));

describe('Login Component', () => {
  test('renders Login component', () => {
    render(<Login />);
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
  });

  test('validates form submission', async () => {
    jest.spyOn(axios, 'request').mockResolvedValue({ data: { token: 'fakeToken' } });

    render(<Login />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Contraseña');
    const submitButton = screen.getByText('Iniciar Sesión');

    fireEvent.change(emailInput, { target: { value: 'testi4digitalCristian@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'i4digital' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fakeToken');
      expect(screen.getByText('Home Component')).toBeInTheDocument();
    });
  });
});
