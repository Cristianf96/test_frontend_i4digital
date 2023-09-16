import React, { useState, ChangeEvent, FormEvent } from 'react';
import './Register.scss';

interface FormData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '', passwordConfirmation: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el envío del formulario
  };

  return (
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
  );
}

export default Register;
