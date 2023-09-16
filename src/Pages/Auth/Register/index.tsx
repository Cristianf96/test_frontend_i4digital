import React, { useState, ChangeEvent, FormEvent } from 'react';
import './Register.scss';
import Home from '../../Home';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState<FormData>({ email: '', password: '', passwordConfirmation: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password, passwordConfirmation } = formData;

    if (!email || !password || !passwordConfirmation) {
      toast.error('Todos los campos son obligatorios.', {
        duration: 4000,
        position: 'top-center'
      });
      return;
    }

    if (password !== passwordConfirmation) {
      toast.error('Las contraseñas no coinciden.', {
        duration: 4000,
        position: 'top-center'
      });
      return;
    }


    const options = {
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_URL}/api/register`,
      data: {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      },
      headers: {
        Authorization: `bearer ${token}`
      },
    };

    const response = await axios.request(options).then(function (response) {
      return response.data
    }).catch(function (error) {
      toast.error('No se pudo crear.', {
        duration: 4000,
        position: 'top-center'
      });
      console.error(error);
    });

    if (response.email === email) {
      toast.success('Registro exitoso.', {
        duration: 4000,
        position: 'top-center'
      });
      setTimeout(() => navigate('/test_frontend_i4digital'), 5000);
    }
  };


  if (token) {
    return <Home />;
  }

  return (
    <div className='register'>
      <Toaster />
      <div className="register-form">
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirmar Contraseña"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            required
          />
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
