import React, { useState, ChangeEvent, FormEvent } from 'react';
import './Login.scss';
import { FormData } from '../../../utils/Interfaces/Interfaces';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Home from '../../Home';
import LoadingLoginComponent from '../../../Components/Animations/Login';

const Login: React.FC = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [Loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData

    if (email.trim() && password.trim()) {
      setLoading(true)
      try {
        const options = {
          method: 'POST',
          url: `${import.meta.env.VITE_BASE_URL}/api/auth`,
          data: { email: email.trim(), password: password.trim() }
        };

        const response = await axios.request(options).then(function (response) {
          return response.data
        }).catch(function (error) {
          alert('Could not login successfully.');
          console.error(error);
          setLoading(false)
        });

        localStorage.setItem('token', response.token)
        navigate('/test_frontend_i4digital/inicio')
      } catch (error) {
        console.error('Error al autenticar:', error)
        setLoading(false)
      }
    }
  };

  if (token) {
    return <Home />;
  }

  return !Loading ? (
    <div className='login'>
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  ) : (
    <div className='login'>
      <LoadingLoginComponent />
    </div>
  );

}

export default Login;